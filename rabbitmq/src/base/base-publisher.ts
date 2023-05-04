import * as amqp from "amqplib";
import { Subjects } from "../subjects";

interface Event {
  subject: Subjects;
  data: any;
}

class RabbitMQ {
  private connection!: amqp.Connection;
  private channel!: amqp.Channel;

  constructor(
    private queueName: string,
    private exchangeName: string,
    private exchangeType: string,
    private routingKey: string,
  ) { }

  public async connect(url: string): Promise<void> {
    this.connection = await amqp.connect(url);
    this.channel = await this.connection.createChannel();
    await this.channel.assertQueue(this.queueName);
    await this.channel.assertExchange(this.exchangeName, this.exchangeType);
    // await this.channel.bindQueue(this.queueName, this.exchangeName, this.routingKey);
  }

  public async sendToQueue(message: string): Promise<void> {
    await this.channel.sendToQueue(this.queueName, Buffer.from(message), {
      persistent: true,
    });
  }

  public async consume(callback: (message: string) => void): Promise<void> {
    await this.channel.consume(this.queueName, async (message) => {
      try {
        const messageContent = message!.content.toString();
        await callback(messageContent);
        this.channel.ack(message!);
      } catch (error) {
        console.error(error);
        this.channel.nack(message!, false, false);
      }
    });
  }

  public async close(): Promise<void> {
    await this.channel.close();
    await this.connection.close();
  }
}

export default RabbitMQ;
