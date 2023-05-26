import "express-async-errors";
import express from "express";
// import { body } from "express-validator";
import * as CategoryController from "../controller/category.controller";
import * as SupplierController from "../controller/supplier.controller";
import * as ProductController from "../controller/product.controller";
import { requireAuthor, userAuthor } from "@microservies-inventory/common";

const router = express.Router();

// add Category and get Category
router.post("/api/product/category", userAuthor, requireAuthor, CategoryController.insertCategory);
router.get("/api/product/category", userAuthor, requireAuthor, CategoryController.getAllCategories);

// // add Supplier and get Suppiler
router.post("/api/product/supplier", userAuthor, requireAuthor, SupplierController.insertSupplier);
router.get("/api/product/supplier", userAuthor, requireAuthor, SupplierController.getAllSupplier);

// // add product
// Detail Product
router.get("/api/product/:slug", userAuthor, requireAuthor, ProductController.showProduct);
router.post("/api/product", userAuthor, requireAuthor, ProductController.insertProduct);

export { router as productRouter };
