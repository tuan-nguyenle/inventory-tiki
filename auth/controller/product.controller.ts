// import { Request, Response } from "express";
// import * as ProductServices from "../services/product.services";
// import { validationResult } from "express-validator";
// import {
//   BadRequestError,
//   RequestValidationError,
// } from "../middleware/error/errors";
// import { Product } from "../models/warehouse/product.model";
// // This controller function imports multiple products at once
// export const importProduct = async (req: Request, res: Response) => {
//   const errors = validationResult(req);

//   if (!errors.isEmpty()) {
//     throw new RequestValidationError(errors.array());
//   }

//   const products = req.body.products;
//   // Loop through each product and add it to the database
//   try {
//     let result: {}[] = [];
//     for (const product of products) {
//       let existingProduct = await ProductServices.searchProduct(product);
//       if (existingProduct) {
//         existingProduct.quantity += product.quantity;
//         ProductServices.findOneUpdate(existingProduct)
//           .then(() => {
//             result.push({
//               product: product,
//               status: `Update ${product.product_name} success`,
//             });
//           })
//           .catch(() => {
//             result.push({
//               product: product,
//               status: `Update ${product.product_name} failed`,
//             });
//           });
//       } else {
//         const newProduct = new Product(product);
//         ProductServices.addNewProduct(newProduct)
//           .then(() => {
//             result.push({
//               product: product,
//               status: `Add new ${product.product_name} success`,
//             });
//           })
//           .catch(() => {
//             result.push({
//               product: product,
//               status: `Add new ${product.product_name} failed`,
//             });
//           });
//       }
//     }
//     res.status(200).json({ result });
//   } catch (err: any) {
//     throw new BadRequestError(`${err.message}`);
//   }
// };
