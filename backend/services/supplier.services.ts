import { Supplier } from "../models/warehouse/supplier.model";
export const findOneSupplier = async (supplier_name: any) => {
  return await Supplier.findOne({ supplier_name });
};

export const addNewSupplier = async (supplier_attribute: Supplier) => {
  const supplier = new Supplier({
    name_supplier: supplier_attribute.name_supplier,
    business: supplier_attribute.business,
    location: supplier_attribute.location,
    phone: supplier_attribute.phone,
  });
  return supplier.save();
};

export const getSupplier = async () => {
  return await Supplier.find();
};
