import express from "express";
import { authentication } from "./auth-routes";

export const routes = express.Router().use(authentication);
