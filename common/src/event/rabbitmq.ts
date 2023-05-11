import amqp from 'amqplib';
import { Subjects } from './subjects';

interface Event {
  subject: Subjects;
  data: any;
}

export abstract class RabbitMQ<T extends Event> {
  private url: string;
  private connection!: amqp.Connection;
  private channel!: amqp.Channel;
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
  }

  async consumeMessages(): Promise<void> {
    if (!this.channel) {
      await this.connect();
    }
    await this.channel.assertQueue(this.queueName, { exclusive: true });
    await this.channel.bindQueue(this.queueName, this.exchangeName, this.routingKey);
    await this.channel.consume(this.queueName, (msg) => {
      if (msg !== null) {
        console.log(msg.content.toString());
        // this.channel.ack(msg);
      }
    }, { noAck: true });
  }

}