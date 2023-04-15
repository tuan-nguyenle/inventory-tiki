import { Request, Response } from "express";
import * as ProductServices from "../services/product.services";
import { validationResult } from "express-validator";
import { RequestValidationError } from "../middleware/error/errors";
import { Product } from "../models/warehouse/product.model";

// This controller function imports multiple products at once
export const importProduct = async (req: Request, res: Response) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    throw new RequestValidationError(errors.array());
  }

  const products = req.body.products;
  // Loop through each product and add it to the database
  for (const product of products) {
    const existingProduct = (await ProductServices.searchProduct(
      product
    )) as Product;

    if (!existingProduct) {
      await ProductServices.addNewProduct(product);
    } else {
      // If the existing product already has a quantity property, increase it by the quantity in the request
      if (existingProduct.quantity) {
        existingProduct.quantity += product.quantity;
      } else {
        // Otherwise, set the quantity property to the quantity in the request
        existingProduct.quantity = product.quantity;
      }
      await ProductServices.findOneUpdate(existingProduct);
    }
  }

  // Send success response
  res.status(200).send({
    msg: "Import Finished",
  });
};
