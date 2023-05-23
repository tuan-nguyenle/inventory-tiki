import "express-async-errors";
import { Request, Response } from "express";
import * as Order from "../services/order.services";
import { validationResult } from "express-validator";
import { RequestValidationError } from "@microservies-inventory/common";
import mongoose from "mongoose";
import { OrdersCreatedRequestInsetedProductToPalletPublisher } from "../event/publisher/OrderRequestInsertedToPallet";
import { OrdersExportCreatedPublisher } from "../event/publisher/OrdersExportCreatedPublisher";
import { ProductStatusCheckedListener } from "../event/listener/ProductStatusCheckedListener";

export const viewAllOrders = async (req: Request, res: Response) => {
  const listOrders = await Order.viewAllOrders();
  res.status(200).send({ data: listOrders });
};

export const insertOrders = async (req: Request, res: Response) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    throw new RequestValidationError(errors.array());
  }

  if (req.body.order_type === "Warehouse Export") {
    new OrdersExportCreatedPublisher('amqp://guest:guest@rabbitmq:5672', 'OrdersOutbound', 'fanout', 'inventory-tiki')
      .publishMessage({ products: req.body.packages[0].products });
    new ProductStatusCheckedListener('amqp://guest:guest@rabbitmq:5672', 'ProductChecked', 'fanout', 'inventory-tiki')
      .consumeMessages().then((message) => {
        if (message.status === true) {
          Order.insertOrder(req.body);
        }
      })
      .catch((error) => {
        console.error(error); // Handle any errors that occurred during consumption
      });
    return res.status(201).send({
      message: "Waiting to check condition ...",
    });
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

  const detailOrder = await Order.findOrder({ _id: req.params.id });

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

  try {
    new OrdersCreatedRequestInsetedProductToPalletPublisher('amqp://guest:guest@rabbitmq:5672', 'Orders', 'fanout', 'inventory-tiki')
      .publishMessage({
        name_pallet: req.body.name_pallet,
        product: req.body.products
      });
  } catch (error) {
    console.log(`${error}`);
  }

  if (missingProducts.length === 0) {
    await Order.findOneOrderAndUpdate(req.params.id, { status: "Stocked" });

    res.status(200).send({ status: "The Order is Stocked Finished" });
  } else {
    // await detailOrder
    const orderParent = detailOrder.parentID !== null ? detailOrder.parentID : new mongoose.Types.ObjectId(req.params.id);
    Order.insertOrder({
      container_code: detailOrder.container_code,
      deliverer: detailOrder.deliverer || "",
      license_plates: detailOrder.license_plates || "",
      store_keeper: detailOrder.store_keeper || "",
      order_type: "Warehouse Orders Repack",
      status: "Unchecked",
      packages: missingProducts,
      stack_car: detailOrder.stack_car,
      parentID: orderParent,
      childID: []
    }).then((result) => {
      Order.findOneOrderAndUpdate(
        orderParent.toString(),
        { status: "Not Enough Stock", childID: result._id }
      );

      res.status(200).send({
        message: "The Order not finished Because Not Enough Stock",
        missingProducts: missingProducts
      });
    });
  }
};

export const getDetailOrder = async (req: Request, res: Response) => {
  const orderDetail = await Order.findOrder({ _id: req.params.id, reback: true });
  res.status(200).send({ data: orderDetail });
}

export const exportProduct = async (req: Request, res: Response) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    throw new RequestValidationError(errors.array());
  }

  // console.log(req.body);

  // new OrdersCreatedRequestInsetedProductToPalletPublisher('amqp://guest:guest@rabbitmq:5672', 'Orders', 'fanout', 'inventory-tiki')
  //   .publishMessage({
  //     name_pallet: req.body.name_pallet,
  //     product: req.body.products
  //   });

  // await Order.findOneOrderAndUpdate(req.params.id, { status: "Delivery" });

  res.status(200).send({ msg: "...." });
};