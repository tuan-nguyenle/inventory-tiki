import "express-async-errors";
import express, { Request, Response } from "express";
import * as PalletController from "../controller/pallet.controller";
// import { body } from "express-validator";
import * as ShelfController from "../controller/shelf.controller";
import { requireAuthor, userAuthor } from "@microservies-inventory/common";
import { Shelf } from "../models/shelf.model";
const router = express.Router();

// get list api
router.post("/api/warehouse/pallets", userAuthor, requireAuthor, PalletController.insertPallet);
router.get("/api/warehouse/pallets", userAuthor, requireAuthor, PalletController.searchPallet);
router.post("/api/warehouse/pallets/:id", userAuthor, requireAuthor, PalletController.updateStatus);

// shelf
router.post("/api/warehouse/shelf", userAuthor, requireAuthor, ShelfController.transferToShelf);
router.get("/api/warehouse/shelf", userAuthor, requireAuthor, ShelfController.findShelf);
router.post("/api/warehouse/findMultipleShelf", userAuthor, requireAuthor, ShelfController.findMultipleShelf);
router.post("/api/warehouse/findShelfSpecific", userAuthor, requireAuthor, async (req: Request, res: Response) => {
    const listShelf = await Promise.all(
        req.body.products.map(async (product: any) => {

            const shelf = await Shelf.findOne(
                {
                    "products.product_name": product.product_name,
                    "products.supplier_name": product.supplier_name,
                    "products.bar_code": product.bar_code,
                    "products.sku": product.sku
                }
            );
            return { product_name: product.product_name, shelves: shelf };
        })
    );

    res.status(200).send({
        msg: listShelf
    });
});

export { router as warehouse };
