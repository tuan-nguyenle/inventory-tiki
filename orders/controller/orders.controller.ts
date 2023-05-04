import "express-async-errors";
import { Request, Response } from "express";
import * as Order from "../services/order.services";
import { validationResult } from "express-validator";
import { RequestValidationError } from "@microservies-inventory/common";

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
    category: string;
    bar_code: string;
    sku: string;
    unit: string;
    quantity: number;
    supplier_name: string;
  };

  type Package = {
    package_code: string,
    products: Array<Product>
  }

  const detailOrder = await Order.findOneOrder(req.params.id);
  const checkProduct = req.body.products;

  let missingProducts: Array<Package> = [];

  missingProducts = detailOrder!.packages.map((packages) => {
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
            product.quantity = quantityDifference;
            return product;
          }
        } else {
          return product;
        }
      }
    );

    if (listProductMissing.length > 0) {
      return {
        package_code: packages.package_code,
        products: listProductMissing,
      };
    } else {
      return null;
    }
  }).filter((missingPackage) => missingPackage !== null) as Package[];

  if (missingProducts.length === 0) {
    await Order.findOneAndUpdate(req.params.id, { status: "Stocked", checkPoint: "offset" });

    res.status(200).send({ status: "The Order is Stocked Finished" });
  } else {
    Order.findOneAndUpdate(req.params.id, { status: "Not Enough Stock" }).then((result) => {
      Order.insertOrder({
        container_code: result?.container_code || "",
        deliverer: result?.deliverer || "",
        license_plates: result?.license_plates || "",
        store_keeper: result?.store_keeper || "",
        order_type: "Warehouse Orders Repack",
        status: "Unchecked",
        packages: missingProducts,
        stack_car: result?.stack_car || false,
        parentID: result?._id
      });
      res.status(200).send({ status: "The Order not finished Because Not Enough Stock", missingProducts: missingProducts });
    });
  }
};
