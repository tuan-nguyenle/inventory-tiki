import { Publisher } from "../base/base-publisher";
import { OrdersCreatedEvent } from "./orders-created-event";
import { Subjects } from "../subjects";

export class OrdersCreatedPublisher extends Publisher<OrdersCreatedEvent> {
  subject: Subjects.OrdersCreated = Subjects.OrdersCreated;
}
