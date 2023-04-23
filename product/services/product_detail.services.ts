import { ProductDetail } from "../models/product_detail.model";

// export const addNewProduct = async (product_attributes: Product) => {
//   let supplier = await findOneSupplier(product_attributes.supplier);
//   let category = await findOneCategory(product_attributes.category);
//   let condition = await findCondition(product_attributes.condition);

//   const product = new Product({
//     product_name: product_attributes.product_name,
//     bar_code: product_attributes.bar_code,
//     quantity: product_attributes.quantity,
//     condition: condition,
//     category: category,
//     supplier: supplier,
//   });
//   return product.save();
// };

// export const searchProduct = async (product_attributes: ProductDetail) => {

// };

// // To update a product when it already exists, we can use the following code:
// export const findOneUpdate = async (product_attributes: Product) => {
//   // Find the product with the given ID and update its attributes

//   const updatedProduct = await Product.findOneAndUpdate(
//     {
//       bar_code: product_attributes.bar_code,
//       supplier: product_attributes.supplier,
//     },
//     {
//       product_name: product_attributes.product_name,
//       bar_code: product_attributes.bar_code,
//       quantity: product_attributes.quantity,
//       condition: product_attributes.condition,
//       category: product_attributes.category,
//       supplier: product_attributes.supplier,
//     },
//     { new: true }
//   );

//   return updatedProduct;
// };
