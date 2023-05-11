import { RabbitMQ, RequestInsertedProductToPallet, Subjects } from "@microservies-inventory/common";

export class OrdersCreatedRequestInsetedProductToPallet extends RabbitMQ<RequestInsertedProductToPallet>{
    readonly queueName: Subjects.RequestInsertedProductToPallet;
}