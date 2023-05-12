import "express-async-errors";
import { ProductCreated, RabbitMQ, Subjects } from "@microservies-inventory/common";

export class ProductCreatedPublisher extends RabbitMQ<ProductCreated>{
    readonly queueName!: Subjects.ProductCreated;
}