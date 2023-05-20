import { RabbitMQ, ProductStatusChecked, Subjects } from "@microservies-inventory/common";

export class ProductStatusCheckedPublisher extends RabbitMQ<ProductStatusChecked>{
    readonly queueName!: Subjects.ProductStatusChecked;
}