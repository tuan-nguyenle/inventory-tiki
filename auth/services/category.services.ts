// import { Category } from "../models/warehouse/category.model";

// export const findOneCategory = async (category_name: any) => {
//   return await Category.findOne({ category_name });
// };

// export const addNewCategory = async (category_attribute: Category) => {
//   let category_id;
//   if (category_attribute.parent_id) {
//     category_id = await findOneCategory(category_attribute.parent_id);
//   }
//   const category = new Category({
//     category_name: category_attribute.category_name,
//     category_description: category_attribute.category_description,
//     parent_id: category_id?._id,
//   });

//   return category.save();
// };

// export const getCategories = async () => {
//   return await Category.find();
// };
