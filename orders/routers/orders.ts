import express, { Request, Response } from "express";
import { Receipt } from "../models/receipt.model";
const router = express.Router();

router.post("/api/orders/test", async (req: Request, res: Response) => {
  const receipt = await new Receipt({
    container_code: "ABC123",
    deliverer: "John Doe",
    store_keeper: "Jane Smith",
    packages: [
      {
        package_code: "PKG001",
        products: [
          {
            product_name: "Product 1",
            category: "Category A",
            bar_code: "123456",
            sku: "SKU001",
            supplier_name: "Supplier X",
          },
          {
            product_name: "Product 2",
            category: "Category B",
            bar_code: "789012",
            sku: "SKU002",
            supplier_name: "Supplier Y",
          },
          {
            product_name: "Product 4",
            category: "Category B",
            bar_code: "789012",
            sku: "SKU002",
            supplier_name: "Supplier Y",
          },
        ],
      },
      {
        package_code: "PKG002",
        products: [
          {
            product_name: "Product 3",
            category: "Category B",
            bar_code: "789012",
            sku: "SKU002",
            supplier_name: "Supplier Y",
          },
        ],
      },
    ],
    receipt_type: "Warehouse Receipt",
    status: "Unchecked",
  }).save();
  res.send({ Receipt: receipt });
});

router.get("/api/orders/test", async (req: Request, res: Response) => {
  return res.send({ receipt: await Receipt.find() });
});

export { router as ordersRouter };
