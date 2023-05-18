import { Subjects } from "../subjects";

export interface OrdersExportCreated {
    subject: Subjects.OrdersExportCreated;
    data: {
        products: [
            {
                product_name: string,
                category: string,
                quantity: string,
                bar_code: string,
                sku: string,
                supplier_name: string,
                unit: string
            }
        ]
    };
}
