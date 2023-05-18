import "express-async-errors";
import { RabbitMQ, ProductCreated, Subjects } from "@microservies-inventory/common";
import { insertProduct, searchProduct } from "../../services/product.services";
import { findOneAndUpdate, insertDetailProduct, searchDetailProduct } from "../../services/product_detail.services";

export class ProductCreatedListener extends RabbitMQ<ProductCreated>{
    readonly queueName!: Subjects.ProductCreated;
    async consumeMessages(): Promise<string> {
        return new Promise<string>(async (productId) => {
            if (!this.channel) {
                await this.connect();
            }
            await this.channel.assertQueue(this.queueName, { exclusive: true });
            await this.channel.bindQueue(this.queueName, this.exchangeName, this.routingKey);
            await this.channel.consume(this.queueName, async (msg: any) => {
                if (msg !== null) {
                    const { product } = JSON.parse(msg.content.toString());
                    let productExist = await searchProduct({ product });
                    if (!productExist) {
                        productExist = await insertProduct({
                            product_name: product.product_name,
                            category: product.category
                        });
                    }
                    let detailProduct = await searchDetailProduct({
                        bar_code: product.bar_code,
                        sku: product.sku,
                        product: productExist._id,
                        supplier: product.supplier
                    });
                    if (!detailProduct) {
                        detailProduct = await insertDetailProduct({
                            bar_code: product.bar_code,
                            sku: product.sku,
                            unit: product.unit,
                            quantity: product.quantity,
                            product: productExist._id,
                            supplier: product.supplier
                        });
                    } else {
                        detailProduct.quantity += product.quantity;
                        await findOneAndUpdate(detailProduct);
                    }
                    console.log("Product import success");
                    productId(String(detailProduct._id));
                }
            }, { noAck: true });
        })
    }
}