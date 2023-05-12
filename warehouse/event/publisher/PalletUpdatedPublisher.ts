import "express-async-errors";
import { PalletUpdated, RabbitMQ, Subjects } from "@microservies-inventory/common";

export class PalletUpdatedPublisher extends RabbitMQ<PalletUpdated>{
    readonly queueName!: Subjects.PalletUpdated;
}