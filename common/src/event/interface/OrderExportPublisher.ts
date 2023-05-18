import { Subjects } from "../subjects";

export interface OrdersExportCreated {
    subject: Subjects.OrdersExportCreated;
    data: {
        products: [
            Record<string, any>
        ]
    };
}
