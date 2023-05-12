import { ProductDetail } from "../models/product_detail.model";
import { findOneSupplier } from "./supplier.services";

export const searchDetailProduct = async (data: Record<string, any>) => {
    return ProductDetail.findOne({ data });
};

export const insertDetailProduct = async (data: Record<string, any>) => {
    let supplier = await findOneSupplier(data.supplier);

    const detailProduct = new ProductDetail({
        bar_code: data.bar_code,
        sku: data.sku,
        quantity: data.quantity,
        product: data.product,
        supplier: supplier?._id,
        unit: data.unit
    });

    return detailProduct.save();
}

export const findOneAndUpdate = async (data: Record<string, any>) => {
    const detailProduct = await ProductDetail.findOneAndUpdate({ _id: data._id }, data);

    return detailProduct;
};