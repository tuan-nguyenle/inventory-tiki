import { Subjects } from "../subjects";

export interface OrdersCreatedEvent {
  subject: Subjects.OrdersCreated;
  data: {
    id: string;
    title: string;
    price: number;
  };
}
