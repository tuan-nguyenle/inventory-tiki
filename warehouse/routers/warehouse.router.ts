import "express-async-errors";
import express from "express";
import * as PalletController from "../controller/pallet.controller";
// import { body } from "express-validator";
import * as ShelfController from "../controller/shelf.controller";
import { requireAuthor, userAuthor } from "@microservies-inventory/common";
const router = express.Router();

// get list api
router.post("/api/warehouse/pallets", userAuthor, requireAuthor, PalletController.insertPallet);
router.get("/api/warehouse/pallets", userAuthor, requireAuthor, PalletController.searchPallet);
router.post("/api/warehouse/pallets/:id", userAuthor, requireAuthor, PalletController.updateStatus);

// shelf
router.post("/api/warehouse/shelf", userAuthor, requireAuthor, ShelfController.transferToShelf);
router.get("/api/warehouse/shelf", userAuthor, requireAuthor, ShelfController.findShelf);
router.post("/api/warehouse/findMultipleShelf", userAuthor, requireAuthor, ShelfController.findMultipleShelf);

export { router as warehouse };
