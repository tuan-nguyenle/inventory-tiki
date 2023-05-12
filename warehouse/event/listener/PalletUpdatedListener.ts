import "express-async-errors";
import { RabbitMQ, PalletUpdated, Subjects } from "@microservies-inventory/common";
import { findOneAndUpdate, findOnePallet, updateMany } from "../../services/pallet.services";

export class PalletUpdatedListener extends RabbitMQ<PalletUpdated>{
    readonly queueName!: Subjects.PalletUpdated;
    async consumeMessages(): Promise<void> {
        if (!this.channel) {
            await this.connect();
        }
        await this.channel.assertQueue(this.queueName, { exclusive: true });
        await this.channel.bindQueue(this.queueName, this.exchangeName, this.routingKey);
        await this.channel.consume(this.queueName, async (msg) => {
            if (msg !== null) {
                const { name_pallet, product } = JSON.parse(msg.content.toString());
                console.log(name_pallet, product);
                try {
                    const pallets = await findOnePallet(name_pallet);
                    const matchingProduct = pallets.products.find(
                        (productPallet) => productPallet.bar_code === product.bar_code
                            && productPallet.supplier_name === product.supplier_name
                            && productPallet.sku === product.sku
                    );
                    if (matchingProduct) {
                        matchingProduct.quantity -= product.quantity;
                    }
                    await findOneAndUpdate(pallets);
                    if (matchingProduct?.quantity === 0) {
                        await updateMany(pallets);
                    }
                } catch (error) {
                    console.error(error);
                }
                console.log("Updated pallet");
            }
        }, { noAck: true });
    }
}