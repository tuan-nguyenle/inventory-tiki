import "express-async-errors";
import { Request, Response } from "express";
import { RequestValidationError } from "../middleware/error/errors";
import { validationResult } from "express-validator";
import * as Category from "../services/category.services";

export const addNewCategory = async (req: Request, res: Response) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    throw new RequestValidationError(errors.array());
  }

  const category = await Category.addNewCategory(req.body);

  res.status(200).send({
    msg: "Add New Category Success",
    category: category,
  });
};

export const getCategories = async (req: Request, res: Response) => {
  const listCategory = await Category.getCategories();
  // console.log(listCategory);

  res.send({
    Category: listCategory,
  });
};
