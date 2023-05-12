import { Product } from "../models/product.model";
import { findOneCategory, insertCategory } from "./category.services";

export const showProduct = async (slug: string) => {
  const product = await Product.find({
    slug: slug,
  }).exec();
  return product;
};

export const insertProduct = async (product_attributes: Record<string, any>) => {
  let category = await findOneCategory(product_attributes.category);
  if (!category) {
    category = await insertCategory({
      category_name: String(product_attributes.category),
      category_description: "Text",
      parent_id: null
    });
  }

  const product = new Product({
    product_name: product_attributes.product_name,
    category: category,
  });

  return product.save();
};

export const searchProduct = async (data: Record<string, any>) => {

  return Product.findOne({ product_name: data.product.product_name }).exec();
}