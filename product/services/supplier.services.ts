import { Supplier } from "../models/supplier.model";

export const findOneSupplier = async (name_supplier: any) => {
  return await Supplier.findOne({ name_supplier });
};

export const insertSupplier = async (supplier_attribute: Supplier) => {
  console.log(supplier_attribute);

  const supplier = new Supplier({
    name_supplier: supplier_attribute.name_supplier,
    business: supplier_attribute.business,
    location: supplier_attribute.location,
    phone: supplier_attribute.phone,
  });
  return await supplier.save();
};

export const getAllSupplier = async () => {
  return await Supplier.find();
};
