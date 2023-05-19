import "express-async-errors";
import express from "express";
import * as PalletController from "../controller/pallet.controller";
// import { body } from "express-validator";
import * as ShelfController from "../controller/shelf.controller";
import { requireAuthor } from "@microservies-inventory/common";
const router = express.Router();

// get list api
router.post("/api/warehouse/pallets", requireAuthor, PalletController.insertPallet);
router.get("/api/warehouse/pallets", requireAuthor, PalletController.searchPallet);
router.post("/api/warehouse/pallets/:id", requireAuthor, PalletController.updateStatus);

// shelf
router.post("/api/warehouse/shelf", requireAuthor, ShelfController.transferToShelf);
router.get("/api/warehouse/shelf", requireAuthor, ShelfController.findShelf);

export { router as warehouse };
