import express from "express";
import { ordersRouter } from "./orders";

export const routes = express.Router().use(ordersRouter);
