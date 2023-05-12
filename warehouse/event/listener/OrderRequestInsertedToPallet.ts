import { BadRequestError, RabbitMQ, RequestInsertedProductToPallet, Subjects } from "@microservies-inventory/common";
import { searchPallet } from "../../services/pallet.services";

export class OrdersCreatedRequestInsetedProductToPalletListener extends RabbitMQ<RequestInsertedProductToPallet>{
    readonly queueName!: Subjects.RequestInsertedProductToPallet;
    async consumeMessages(): Promise<void> {
        if (!this.channel) {
            await this.connect();
        }
        await this.channel.assertQueue(this.queueName, { exclusive: true });
        await this.channel.bindQueue(this.queueName, this.exchangeName, this.routingKey);
        await this.channel.consume(this.queueName, async (msg) => {
            if (msg !== null) {
                const data = JSON.parse(msg.content.toString());
                if (await searchPallet({ name_pallet: data.name_pallet })) {
                    console.log(data);
                }
                // throw new BadRequestError("Pallet not exist");

                // this.channel.ack(msg);
            }
        }, { noAck: true });
    }
}