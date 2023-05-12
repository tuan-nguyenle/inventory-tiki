import "express-async-errors";
import express from "express";
import * as PalletController from "../controller/pallet.controller";
// import { body } from "express-validator";

const router = express.Router();

// get list api
router.post("/api/warehouse/pallets", PalletController.insertPallet);
router.get("/api/warehouse/pallets", PalletController.searchPallet);
router.post("/api/warehouse/pallets/:id", PalletController.updateStatus);

export { router as warehouse };
