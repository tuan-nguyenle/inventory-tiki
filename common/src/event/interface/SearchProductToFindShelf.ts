import { Subjects } from "../subjects";

export interface SearchProductToFindShelf {
    subject: Subjects.ShelfSearch;
    data: {
        productDetail: any,
    };
}
