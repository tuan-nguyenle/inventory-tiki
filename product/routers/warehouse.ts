import "express-async-errors";
import express from "express";
// import { body } from "express-validator";
import * as CategoryController from "../controller/category.controller";
import * as SupplierController from "../controller/supplier.controller";
import * as ProductController from "../controller/product.controller";

const router = express.Router();

// add Category and get Category
router.post("/api/product/category", CategoryController.insertCategory);
router.get("/api/product/category", CategoryController.getAllCategories);

// // add Supplier and get Suppiler
router.post("/api/product/supplier", SupplierController.insertSupplier);
router.get("/api/product/supplier", SupplierController.getAllSupplier);

// // add product
// Detail Product
router.get("/api/product/:slug", ProductController.showProduct);
router.post("/api/product", ProductController.insertProduct);

export { router as warehouse };
