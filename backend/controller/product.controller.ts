import { Request, Response } from "express";
import * as Product from "../services/product.services";
import { validationResult } from "express-validator";
import { RequestValidationError } from "../middleware/error/errors";

export const importProduct = async (req: Request, res: Response) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    throw new RequestValidationError(errors.array());
  }

  const product = Product.addNewProduct(req.body);

  res.status(200).send({
    msg: "Import Success",
  });
};
