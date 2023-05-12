import { RabbitMQ, RequestInsertedProductToPallet, Subjects } from "@microservies-inventory/common";

export class OrdersCreatedRequestInsetedProductToPalletPublisher extends RabbitMQ<RequestInsertedProductToPallet>{
    readonly queueName!: Subjects.RequestInsertedProductToPallet;
}