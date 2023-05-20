import "express-async-errors";
import { RabbitMQ, OrdersExportCreated, Subjects } from "@microservies-inventory/common";
// import { insertProduct, searchProduct } from "../../services/product.services";
import { searchDetailProduct } from "../../services/product_detail.services";
import { findOneSupplier } from "../../services/supplier.services";
import io from 'socket.io';
import { ProductStatusCheckedPublisher } from "../publisher/ProductStatusCheckedPublisher";

export class OrdersExportCreatedListener extends RabbitMQ<OrdersExportCreated>{
    readonly queueName!: Subjects.OrdersExportCreated;
    async consumeMessages(io: io.Server): Promise<void> {
        if (!this.channel) {
            await this.connect();
        }
        await this.channel.assertQueue(this.queueName, { exclusive: true });
        await this.channel.bindQueue(this.queueName, this.exchangeName, this.routingKey);
        await this.channel.consume(this.queueName, async (msg: any) => {
            if (msg !== null) {
                const { products } = JSON.parse(msg.content.toString());
                try {
                    let listProd = [];
                    listProd = await Promise.all(products.map(async (element: any) => {
                        const existsSup = await findOneSupplier(element.supplier_name);
                        const existProd = await searchDetailProduct({
                            bar_code: element.bar_code,
                            sku: element.sku,
                            supplier: existsSup?._id
                        });

                        if (existProd !== null && existProd?.quantity >= element.quantity) {
                            return existProd;
                        }
                    }));

                    if (listProd.includes(undefined)) {
                        new ProductStatusCheckedPublisher('amqp://guest:guest@rabbitmq:5672', 'ProductChecked', 'fanout', 'inventory-tiki').publishMessage({ status: false });

                        io.emit("notify", {
                            msg: "Not Enough Products"
                        })
                    } else {
                        new ProductStatusCheckedPublisher('amqp://guest:guest@rabbitmq:5672', 'ProductChecked', 'fanout', 'inventory-tiki').publishMessage({ status: true });

                        io.emit("notify", {
                            msg: "New Orders Export"
                        })
                    }
                } catch (error) {
                    console.error(error);
                }
            }
        }, { noAck: true });
    }
}