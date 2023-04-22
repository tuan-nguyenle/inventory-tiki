import express from "express";
import { authentication } from "./auth-routes";
// import { warehouse } from "./warehouse";

export const routes = express.Router().use(authentication);
// .use(warehouse);
