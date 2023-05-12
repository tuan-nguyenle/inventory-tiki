import "express-async-errors";
import express from "express";
import * as PalletController from "../controller/pallet.controller";
// import { body } from "express-validator";
import * as ShelfController from "../controller/shelf.controller";
const router = express.Router();

// get list api
router.post("/api/warehouse/pallets", PalletController.insertPallet);
router.get("/api/warehouse/pallets", PalletController.searchPallet);
router.post("/api/warehouse/pallets/:id", PalletController.updateStatus);

// shelf
router.post("/api/warehouse/shelf", ShelfController.transferToShelf);

export { router as warehouse };
