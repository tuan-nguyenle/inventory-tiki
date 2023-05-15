import "express-async-errors";
import { Request, Response } from "express";
import { validationResult } from "express-validator";
import { RequestValidationError } from "@microservies-inventory/common";
import * as ShelfServices from "../services/shelf.services";
import { PalletUpdatedPublisher } from "../event/publisher/PalletUpdatedPublisher";
import { ProductCreatedPublisher } from "../event/publisher/ProductCreatedPublisher";

export const findShelf = async (req: Request, res: Response) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        throw new RequestValidationError(errors.array());
    }

    try {
        await ShelfServices.findShelf(req.params);
    } catch (error) {
        console.log(error);
    }
}

export const transferToShelf = async (req: Request, res: Response) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        throw new RequestValidationError(errors.array());
    }

    try {
        const shelf = await ShelfServices.findOneShelf(req.body.shelf_code);
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
        await ShelfServices.findOneAndUpdate(shelf);
        new PalletUpdatedPublisher('amqp://guest:guest@rabbitmq:5672', 'Pallet', 'fanout', 'inventory-tiki').publishMessage(
            {
                name_pallet: req.body.pallet_name,
                product: req.body.product
            }
        );
        new ProductCreatedPublisher('amqp://guest:guest@rabbitmq:5672', 'Product', 'fanout', 'inventory-tiki').publishMessage(
            {
                product: req.body.product,
            }
        );
    } catch (error) {
        console.error(error);
    }

    return res.status(200).send({ "msg": "transfer to shelf success" });
}