import "express-async-errors";
import { Request, Response } from "express";
import { RequestValidationError } from "@microservies-inventory/common";
import { validationResult } from "express-validator";
import * as Supplier from "../services/supplier.services";

export const insertSupplier = async (req: Request, res: Response) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    throw new RequestValidationError(errors.array());
  }

  const supplier = await Supplier.insertSupplier(req.body);

  res.status(200).send({
    msg: "Add New Supplier Success",
    data: supplier,
  });
};

export const getAllSupplier = async (req: Request, res: Response) => {
  const listSupplier = await Supplier.getAllSupplier();
  res.send({
    data: listSupplier,
  });
};
