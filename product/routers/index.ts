import express from "express";
import { warehouse } from "./warehouse";

export const routes = express.Router().use(warehouse);
