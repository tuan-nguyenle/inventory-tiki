import { BadRequestError } from "@microservies-inventory/common";
import { Product } from "../models/product.model";
import { findOneCategory } from "./category.services";

export const showProduct = async (slug: string) => {
  const product = await Product.find({
    slug: slug,
  }).exec();
  return product;
};

export const insertProduct = async (product_attributes: Product) => {
  const category = await findOneCategory(product_attributes.category);
  if (!category) {
    throw new BadRequestError(
      `Category ${product_attributes.category} not exist`
    );
  }

  const product = new Product({
    product_name: product_attributes.product_name,
    category: category,
  });

  return product.save();
};
