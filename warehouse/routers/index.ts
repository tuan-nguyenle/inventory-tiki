import express from "express";
import { warehouse } from "./warehouse.router";

export const routes = express.Router().use(warehouse);
