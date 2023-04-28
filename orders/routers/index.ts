import express from "express";
import { ordersRouter } from "./orders.router";

export const routes = express.Router().use(ordersRouter);
