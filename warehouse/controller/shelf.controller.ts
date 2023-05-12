import "express-async-errors";
import { Request, Response } from "express";
// import * as PalletServices from "../services/pallet.services";
import { validationResult } from "express-validator";
import { RequestValidationError } from "@microservies-inventory/common";
import { findOneAndUpdate, findOneShelf } from "../services/shelf.services";
import { PalletUpdatedPublisher } from "../event/publisher/PalletUpdatedPublisher";

export const transferToShelf = async (req: Request, res: Response) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        throw new RequestValidationError(errors.array());
    }

    try {
        const shelf = await findOneShelf(req.body.shelf_code);
        const matchingProduct = shelf.products.find(
            (productShelf) => productShelf.bar_code === req.body.product.bar_code
                && productShelf.supplier_name === req.body.product.supplier_name
                && productShelf.sku === req.body.product.sku
        );
        if (matchingProduct) {
            // update the quantity of the matching product in the pallet
            matchingProduct.quantity += req.body.product.quantity;
        } else {
            // add the req.body.product to the pallet
            shelf.products.push(req.body.product);
        }
        await findOneAndUpdate(shelf);
        new PalletUpdatedPublisher('amqp://guest:guest@rabbitmq:5672', 'Pallet', 'fanout', 'inventory-tiki').publishMessage(
            {
                name_pallet: req.body.pallet_name,
                product: req.body.product
            }
        );

    } catch (error) {
        console.error(error);
    }

    return res.status(200).send({ "msg": "transfer to shelf success" });
}

// export const insertPallet = async (req: Request, res: Response) => {
//     const errors = validationResult(req);

//     if (!errors.isEmpty()) {
//         throw new RequestValidationError(errors.array());
//     }

//     await PalletServices.insertPallet(req.body);

//     return res
//         .status(201)
//         .send({ msg: "Insert new Pallet success" });
// };

// export const updateStatus = async (req: Request, res: Response) => {
//     const errors = validationResult(req);

//     if (!errors.isEmpty()) {
//         throw new RequestValidationError(errors.array());
//     }
//     const data = { _id: req.params.id, status: true };
//     await PalletServices.findOneAndUpdate(data);

//     return res.status(200).send({ msg: "validate success" });
// }