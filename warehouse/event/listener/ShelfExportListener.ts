import "express-async-errors";
import { RabbitMQ, ShelfExport, Subjects } from "@microservies-inventory/common";
import { findShelf } from "../../services/shelf.services";

export class ShelfExportListener extends RabbitMQ<ShelfExport>{
    readonly queueName!: Subjects.ShelfExport;
    async consumeMessages(): Promise<void> {
        if (!this.channel) {
            await this.connect();
        }
        await this.channel.assertQueue(this.queueName, { exclusive: true });
        await this.channel.bindQueue(this.queueName, this.exchangeName, this.routingKey);
        await this.channel.consume(this.queueName, async (msg: any) => {
            if (msg !== null) {
                const { products } = JSON.parse(msg.content.toString());
                products.forEach(async (productOrder: any) => {
                    const shelf = await findShelf(productOrder);
                    if (shelf !== null && shelf !== undefined) {
                        console.log(shelf[0].products);

                        const matchingProduct = shelf[0].products.find(
                            (productShelf) => productShelf.bar_code === productOrder.bar_code
                                && productShelf.supplier_name === productOrder.supplier_name
                                && productShelf.sku === productOrder.sku
                        );
                        if (matchingProduct) {
                            // update the quantity of the matching product in the pallet
                            matchingProduct.quantity -= productOrder.quantity;
                        }
                    }
                    console.log(shelf);
                });
            }
        }, { noAck: true });
    }
}