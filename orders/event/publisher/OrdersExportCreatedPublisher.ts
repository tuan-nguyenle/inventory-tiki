import { RabbitMQ, OrdersExportCreated, Subjects } from "@microservies-inventory/common";

export class OrdersExportCreatedPublisher extends RabbitMQ<OrdersExportCreated>{
    readonly queueName!: Subjects.OrdersExportCreated;
}