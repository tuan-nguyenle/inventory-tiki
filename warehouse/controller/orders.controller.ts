import "express-async-errors";
import { Request, Response } from "express";
// import * as Order from "../services/order.services";
import { validationResult } from "express-validator";
import { RequestValidationError } from "@microservies-inventory/common";
import mongoose from "mongoose";
// import { OrdersCreatedRequestInsetedProductToPalletPublisher } from "../event/publisher/OrderRequestInsertedToPallet";

