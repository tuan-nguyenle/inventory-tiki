import { Subjects } from "../subjects";

export interface ProductCreated {
    subject: Subjects.ProductCreated;
    data: {
        product: {
            product_name: string,
            category: string,
            bar_code: string,
            quantity: string,
            sku: string,
            supplier_name: string
        };
    };
}
