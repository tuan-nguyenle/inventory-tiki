import express from "express";
import * as OrderController from "../controller/orders.controller";
const router = express.Router();

router.post("/api/orders", OrderController.insertOrders);

router.get("/api/orders", OrderController.viewAllOrders);

router.post("/api/orders/:id", OrderController.checkOrder);

export { router as ordersRouter };
