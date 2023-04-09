import { ConditionProduct } from "../models/warehouse/condition_product.model";

export const findCondition = async (description: any) => {
  const condition = await ConditionProduct.find({ description });
  if (condition.length === 0) {
    return new ConditionProduct({
      description: description,
    }).save();
  }
  return condition;
};
