import "express-async-errors";
import { Request, Response } from "express";
import { RequestValidationError } from "@microservies-inventory/common";
import { validationResult } from "express-validator";
import * as Product from "../services/product.services";

export const showProduct = async (req: Request, res: Response) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    throw new RequestValidationError(errors.array());
  }

  const product = await Product.showProduct(req.params.slug);

  res.status(200).send({
    data: product,
  });
};

export const insertProduct = async (req: Request, res: Response) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    throw new RequestValidationError(errors.array());
  }

  const product = await Product.insertProduct(req.body);

  res.status(200).send({
    msg: "Add New Product Success",
    data: product,
  });
};
