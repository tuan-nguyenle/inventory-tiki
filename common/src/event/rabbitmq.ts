import amqp from 'amqplib';
import { Subjects } from './subjects';

interface Event {
  subject: Subjects;
  data: any;
}

export abstract class RabbitMQ<T extends Event> {
  protected url: string;
  protected connection!: amqp.Connection;
  protected channel!: amqp.Channel;
  protected exchangeName: string;
  protected exchangeType: string;
  protected routingKey: string;
  abstract queueName: T['subject'];

  constructor(url: string, exchangeName: string, exchangeType: string, routingKey: string) {
    this.url = url;
    this.exchangeName = exchangeName;
    this.exchangeType = exchangeType;
    this.routingKey = routingKey;
  }

  async connect(): Promise<void> {
    this.connection = await amqp.connect(this.url);
    this.channel = await this.connection.createChannel();
    await this.channel.assertExchange(
      this.exchangeName,
      this.exchangeType,
      { durable: false }
    );
  }

  async close(): Promise<void> {
    if (this.channel) {
      await this.channel.close();
    }

    if (this.connection) {
      await this.connection.close();
    }
  }

  async publishMessage(message: T['data']): Promise<void> {
    if (!this.channel) {
      await this.connect();
    }
    await this.channel.publish(this.exchangeName, this.routingKey, Buffer.from(JSON.stringify(message)));
    console.log(`Message '${JSON.stringify(message)}' sent to exchange '${this.exchangeName}'`);
    setTimeout(() => {
      this.close();
    }, 500);
  }
}