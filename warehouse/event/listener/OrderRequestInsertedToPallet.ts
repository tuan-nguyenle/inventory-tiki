import { RabbitMQ, RequestInsertedProductToPallet, Subjects } from "@microservies-inventory/common";

export class OrdersCreatedRequestInsetedProductToPalletListener extends RabbitMQ<RequestInsertedProductToPallet>{
    readonly queueName!: Subjects.RequestInsertedProductToPallet;
    async consumeMessages(): Promise<void> {
        if (!this.channel) {
            await this.connect();
        }
        await this.channel.assertQueue(this.queueName, { exclusive: true });
        await this.channel.bindQueue(this.queueName, this.exchangeName, this.routingKey);
        await this.channel.consume(this.queueName, (msg) => {
            if (msg !== null) {
                console.log(msg.content.toString());
                console.clear();
                // this.channel.ack(msg);
            }
        }, { noAck: true });
    }
}