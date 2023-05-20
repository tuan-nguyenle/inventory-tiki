import { Subjects } from "../subjects";

export interface ProductStatusChecked {
    subject: Subjects.ProductStatusChecked;
    data: {
        status: Boolean;
    };
}
