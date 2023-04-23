import "express-async-errors";
import { Request, Response } from "express";
import { RequestValidationError } from "@microservies-inventory/common";
import { validationResult } from "express-validator";
import * as Category from "../services/category.services";

export const insertCategory = async (req: Request, res: Response) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    throw new RequestValidationError(errors.array());
  }

  const category = await Category.insertCategory(req.body);

  res.status(200).send({
    msg: "Add New Category Success",
    data: category,
  });
};

export const getAllCategories = async (req: Request, res: Response) => {
  const listCategory = await Category.getAllCategories();
  res.send({
    data: listCategory,
  });
};
