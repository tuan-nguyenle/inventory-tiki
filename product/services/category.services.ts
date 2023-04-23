import { Category } from "../models/category.model";

export const findOneCategory = async (category_name: any) => {
  return await Category.findOne({ category_name });
};

export const insertCategory = async (category_attribute: Category) => {
  let category_id;
  if (category_attribute.parent_id) {
    category_id = await findOneCategory(category_attribute.parent_id);
  }
  const category = new Category({
    category_name: category_attribute.category_name,
    category_description: category_attribute.category_description,
    parent_id: category_id?._id,
  });

  return await category.save();
};

export const getAllCategories = async () => {
  return await Category.find();
};
