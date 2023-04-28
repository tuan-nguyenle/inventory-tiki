import "express-async-errors";
import { Request, Response } from "express";
import * as Order from "../services/order.services";
import { validationResult } from "express-validator";
import { RequestValidationError } from "@microservies-inventory/common/build";

export const viewAllOrders = async (req: Request, res: Response) => {
  const listOrders = await Order.viewAllOrders();
  res.status(200).send({ data: listOrders });
};

export const insertOrders = async (req: Request, res: Response) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    throw new RequestValidationError(errors.array());
  }

  const order = await Order.insertOrder(req.body);

  return res
    .status(201)
    .send({ msg: "Insert new order success", order: order });
};

export const checkOrder = async (req: Request, res: Response) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    throw new RequestValidationError(errors.array());
  }

  type Product = {
    product_name: string;
    bar_code: string;
    quantity: number;
    sku: string;
    supplier_name: string;
  };

  const detailOrder = await Order.viewDetailOrders(req.params.id);
  const checkProduct = req.body.products;

  let missingProducts = [];
  detailOrder!.packages.forEach((packages) => {
    let listProductMissing: Array<Product> = packages.products.filter(
      (product) => {
        const matchingCheckProduct = checkProduct.find(
          (checkProduct: Product) =>
            checkProduct.bar_code === product.bar_code &&
            checkProduct.sku === product.sku &&
            checkProduct.product_name === product.product_name &&
            checkProduct.supplier_name === product.supplier_name
        );

        if (matchingCheckProduct) {
          const quantityDifference =
            product.quantity - matchingCheckProduct.quantity;
          if (quantityDifference > 0) {
            console.log(2);
          }
        } else {
          return product;
        }
      }
    );
  });

  // console.log("\n       -----------------           \n", missingProducts);

  // let missingProducts = detailOrder!.packages.filter((packages) => {
  //   // check tung phan tu cua detail package
  //   const packageCode = packages.package_code;
  //   let missingProductsForPackage = products.filter(
  //     (productToCheck: Product) => {
  //       let found: boolean = false;
  //       packages.products.filter((product) => {
  //         if (
  //           productToCheck.product_name === product.product_name &&
  //           productToCheck.bar_code === product.bar_code &&
  //           productToCheck.sku === product.sku &&
  //           productToCheck.supplier_name === product.supplier_name
  //         ) {
  //           if (product.quantity >= productToCheck.quantity) {
  //             found = true;
  //           }
  //           return;
  //         }
  //       });
  //       if (!found) {
  //         return { products: productToCheck };
  //       }
  //     }
  //   );

  //   if (missingProductsForPackage.length > 0) {
  //     return { packageCode: packageCode, products: products };
  //   }
  // });
  // const result = {
  //   missing: missingProducts,
  // };

  // console.log(result);

  res.status(200).send({ product: req.body.products });

  // const result = {
  //   missing: missingProducts,
  // };
};
