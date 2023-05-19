import express from "express";
import * as OrderController from "../controller/orders.controller";
import { requireAuthor } from "@microservies-inventory/common";
const router = express.Router();

router.post("/api/orders", requireAuthor, OrderController.insertOrders);

router.get("/api/orders", requireAuthor, OrderController.viewAllOrders);

router.post("/api/orders/:id", requireAuthor, OrderController.checkOrder);

router.get("/api/orders/:id", requireAuthor, OrderController.getDetailOrder);

export { router as ordersRouter };
