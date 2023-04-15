import { Product } from "../models/warehouse/product.model";
import { findOneCategory } from "./category.services";
import { findCondition } from "./condition.product.services";
import { findOneSupplier } from "./supplier.services";

export const addNewProduct = async (product_attributes: Product) => {
  let supplier = await findOneSupplier(product_attributes.supplier);
  let category = await findOneCategory(product_attributes.category);
  let condition = await findCondition(product_attributes.condition);

  const product = new Product({
    product_name: product_attributes.product_name,
    bar_code: product_attributes.bar_code,
    quantity: product_attributes.quantity,
    condition: condition,
    category: category,
    supplier: supplier,
  });
  return product.save();
};

export const searchProduct = async (product_attributes: Product) => {
  let supplier = await findOneSupplier(product_attributes.supplier);
  let category = await findOneCategory(product_attributes.category);
  let condition = await findCondition(product_attributes.condition);

  // Find all products that match the given attributes
  const products = await Product.find({
    product_name: product_attributes.product_name,
    bar_code: product_attributes.bar_code,
    condition: condition,
    category: category,
    supplier: supplier,
  });

  // If there are multiple products, return all of them
  if (products.length > 1) {
    return products;
  }
  // If there is only one product, return that product
  if (products.length === 1) {
    return products[0];
  }
  // If there are no products, return null
  return null;
};

// To update a product when it already exists, we can use the following code:
export const findOneUpdate = async (product_attributes: Product) => {
  // Find the product with the given ID and update its attributes

  const updatedProduct = await Product.findOneAndUpdate(
    { bar_code: product_attributes.bar_code },
    {
      product_name: product_attributes.product_name,
      bar_code: product_attributes.bar_code,
      quantity: product_attributes.quantity,
      condition: product_attributes.condition,
      category: product_attributes.category,
      supplier: product_attributes.supplier,
    },
    { new: true }
  );

  return updatedProduct;
};
