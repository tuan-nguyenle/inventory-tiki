import "express-async-errors";
import { RabbitMQ, ProductStatusChecked, Subjects } from "@microservies-inventory/common";

export class ProductStatusCheckedListener extends RabbitMQ<ProductStatusChecked>{
    readonly queueName!: Subjects.ProductStatusChecked;
    async consumeMessages(): Promise<any> {
        if (!this.channel) {
            await this.connect();
        }
        await this.channel.assertQueue(this.queueName, { exclusive: true });
        await this.channel.bindQueue(this.queueName, this.exchangeName, this.routingKey);

        return new Promise<any>((resolve, reject) => {
            this.channel.consume(this.queueName, async (msg: any) => {
                if (msg !== null) {
                    const parsedMessage = JSON.parse(msg.content.toString());
                    resolve(parsedMessage);
                }
            }, { noAck: true });
        });
    }
}