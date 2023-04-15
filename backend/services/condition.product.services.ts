import { ConditionProduct } from "../models/warehouse/condition_product.model";

export const findCondition = async (description: any) => {
  const condition = await ConditionProduct.findOne({ description });
  if (!condition) {
    return new ConditionProduct({
      description: description,
    }).save();
  }
  return condition;
};
