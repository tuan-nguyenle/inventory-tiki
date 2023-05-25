import "express-async-errors";
import { RabbitMQ, OrdersExportCreated, Subjects } from "@microservies-inventory/common";
import { findOneAndUpdate, searchDetailProduct } from "../../services/product_detail.services";
import { findOneSupplier } from "../../services/supplier.services";

export class OrdersExportListener extends RabbitMQ<OrdersExportCreated>{
    readonly queueName!: Subjects.OrdersExportCreated;
    async consumeMessages(): Promise<void> {
        if (!this.channel) {
            await this.connect();
        }
        await this.channel.assertQueue(this.queueName, { exclusive: true });
        await this.channel.bindQueue(this.queueName, this.exchangeName, this.routingKey);
        await this.channel.consume(this.queueName, async (msg: any) => {
            if (msg !== null) {
                const { products } = JSON.parse(msg.content.toString());
                products.forEach(async (product: any) => {
                    let supplierExist = await findOneSupplier(product.supplier_name);
                    let detailProduct = await searchDetailProduct({
                        bar_code: product.bar_code,
                        sku: product.sku,
                        supplier: supplierExist?._id
                    });
                    if (detailProduct !== null) {
                        detailProduct!.quantity -= product.quantity;
                        await findOneAndUpdate(detailProduct);
                        console.log(`updated quantity ${product.product_name} success`);
                    }
                });
                // console.log("Product update quantity success");
            }
        }, { noAck: true });
    }
}