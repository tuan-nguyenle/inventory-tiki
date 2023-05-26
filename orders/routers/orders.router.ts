import express from "express";
import * as OrderController from "../controller/orders.controller";
import { requireAuthor, userAuthor } from "@microservies-inventory/common";
const router = express.Router();

router.post("/api/orders", userAuthor, requireAuthor, OrderController.insertOrders);

router.get("/api/orders", userAuthor, requireAuthor, OrderController.viewAllOrders);

router.post("/api/orders/:id", userAuthor, requireAuthor, OrderController.checkOrder);

router.post("/api/orders/export/:id", userAuthor, requireAuthor, OrderController.exportProduct);

router.get("/api/orders/:id", userAuthor, requireAuthor, OrderController.getDetailOrder);

export { router as ordersRouter };
