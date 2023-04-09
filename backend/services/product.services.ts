import { Product } from "../models/warehouse/product.model";
import { addNewCategory, findOneCategory } from "./category.services";
import { findCondition } from "./condition.product.services";
import { findOneSupplier } from "./supplier.services";

export const addNewProduct = async (product_attributes: Product) => {
  let suppiler = await findOneSupplier(product_attributes.suppiler);
  let category = await findOneCategory(product_attributes.category);
  let condition = await findCondition(product_attributes.condition);

  const product = new Product({
    product_name: product_attributes.product_name,
    bar_code: product_attributes.bar_code,
    quantity: product_attributes.quantity,
    condition: condition,
    category: category,
    suppiler: suppiler,
  });
  return product.save();
};
