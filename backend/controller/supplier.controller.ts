import "express-async-errors";
import { Request, Response } from "express";
import { RequestValidationError } from "../middleware/error/errors";
import { validationResult } from "express-validator";
import * as Supplier from "../services/supplier.services";

export const addNewSupplier = async (req: Request, res: Response) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    throw new RequestValidationError(errors.array());
  }

  const supplier = await Supplier.addNewSupplier(req.body);

  res.status(200).send({
    msg: "Add New Supplier Success",
    Supplier: supplier,
  });
};

export const getSupplier = async (req: Request, res: Response) => {
  const listSupplier = await Supplier.getSupplier();
  res.send({
    Supplier: listSupplier,
  });
};
