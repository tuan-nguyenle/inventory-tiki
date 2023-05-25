import { Subjects } from "../subjects";

export interface ShelfExport {
    subject: Subjects.ShelfExport;
    data: {
        products: [{
            product_name: string,
            category: string,
            bar_code: string,
            quantity: string,
            sku: string,
            supplier_name: string
        }];
    };
}
