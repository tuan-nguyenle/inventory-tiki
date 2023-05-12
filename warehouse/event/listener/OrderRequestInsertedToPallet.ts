import "express-async-errors";
import { RabbitMQ, RequestInsertedProductToPallet, Subjects } from "@microservies-inventory/common";
import { findOneAndUpdate, findOnePallet } from "../../services/pallet.services";

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
                const { name_pallet, product } = JSON.parse(msg.content.toString());
                try {
                    const pallets = await findOnePallet(name_pallet);
                    product.forEach((productOrder: any) => {
                        const matchingProduct = pallets.products.find(
                            (productPallet) => productPallet.bar_code === productOrder.bar_code
                                && productPallet.supplier_name === productOrder.supplier_name
                                && productPallet.sku === productOrder.sku
                        );
                        if (matchingProduct) {
                            // update the quantity of the matching product in the pallet
                            matchingProduct.quantity += productOrder.quantity;
                        } else {
                            // add the productOrder to the pallet
                            pallets.products.push(productOrder);
                        }
                    });
                    await findOneAndUpdate(pallets);
                } catch (error) {
                    console.error(error);
                }
                console.log("New product transfered to pallet");
                // this.channel.ack(msg);
            }
        }, { noAck: true });
    }
}