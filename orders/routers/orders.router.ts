import express from "express";
import * as OrderController from "../controller/orders.controller";
const router = express.Router();

router.post("/api/orders", OrderController.insertOrders);

router.get("/api/orders", OrderController.viewAllOrders);

router.post("/api/orders/:id", OrderController.checkOrder);

router.get("/api/orders/:id", OrderController.getDetailOrder);

export { router as ordersRouter };
