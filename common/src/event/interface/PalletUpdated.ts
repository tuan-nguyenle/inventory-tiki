import { Subjects } from "../subjects";

export interface PalletUpdated {
    subject: Subjects.PalletUpdated;
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
