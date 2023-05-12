import express from "express";
import { productRouter } from "./product.router";

export const routes = express.Router().use(productRouter);
