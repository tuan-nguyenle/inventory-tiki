import "express-async-errors";
import { RabbitMQ, ProductCreated, Subjects } from "@microservies-inventory/common";
import { insertProduct, searchProduct } from "../../services/product.services";
import { findOneAndUpdate, insertDetailProduct, searchDetailProduct } from "../../services/product_detail.services";
import { findOneSupplier, insertSupplier } from "../../services/supplier.services";

export class ProductCreatedListener extends RabbitMQ<ProductCreated>{
    readonly queueName!: Subjects.ProductCreated;
    async consumeMessages(): Promise<void> {
        if (!this.channel) {
            await this.connect();
        }
        await this.channel.assertQueue(this.queueName, { exclusive: true });
        await this.channel.bindQueue(this.queueName, this.exchangeName, this.routingKey);
        await this.channel.consume(this.queueName, async (msg: any) => {
            if (msg !== null) {
                const { product } = JSON.parse(msg.content.toString());
                let productExist = await searchProduct({ product });
                let supplierExist = await findOneSupplier(product.supplier_name);
                if (!supplierExist) {
                    supplierExist = await insertSupplier({
                        name_supplier: product.supplier_name,
                        business: "abc",
                        location: "Text",
                        phone: "0869236546",
                    });
                }
                if (!productExist) {
                    productExist = await insertProduct({
                        product_name: product.product_name,
                        category: product.category
                    });
                }
                let detailProduct = await searchDetailProduct({
                    bar_code: product.bar_code,
                    sku: product.sku,
                    product: productExist?._id,
                    supplier: supplierExist?._id
                });

                if (detailProduct === null) {
                    await insertDetailProduct({
                        bar_code: product.bar_code,
                        sku: product.sku,
                        unit: product.unit,
                        quantity: product.quantity,
                        product: productExist._id,
                        supplier: product.supplier_name
                    });
                } else {
                    detailProduct.quantity += product.quantity;
                    await findOneAndUpdate(detailProduct);
                }
                console.log("Product import success");
            }
        }, { noAck: true });
    }
}