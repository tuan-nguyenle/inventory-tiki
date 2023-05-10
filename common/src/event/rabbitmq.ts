import amqp from 'amqplib';
import { Subjects } from './subjects';

interface Event {
  subject: Subjects;
  data: any;
}

export abstract class RabbitMQ<T extends Event> {
  protected connection!: amqp.Connection;
  protected channel!: amqp.Channel;
  protected exchangeName: string;
  protected exchangeType: string;
  abstract queueName: T['subject'];
  protected routingKey: string;

  constructor(
    urlConnection: amqp.Connection,
    exchangeName: string,
    exchangeType: string,
    routingKey: string,
  ) {
    this.connection = urlConnection;
    this.exchangeName = exchangeName;
    this.exchangeType = exchangeType;
    this.routingKey = routingKey;
  }

  async connect(): Promise<void> {
    this.channel = await this.connection.createChannel();

    await this.channel.assertExchange(this.exchangeName, this.exchangeType);
    await this.channel.assertQueue(this.queueName);
  }

  async sendMessage(message: T['data']): Promise<void> {
    await this.channel.publish(this.exchangeName, this.routingKey, Buffer.from(JSON.stringify(message)));
  }

  async consumeMessage(): Promise<void> {
    await this.channel.bindQueue(this.queueName, this.exchangeName, this.routingKey);
    await this.channel.consume(this.queueName, (msg) => {
      if (msg !== null) {
        console.log(msg.content.toString());
        // this.channel.ack(msg);
      }
    }, { noAck: true });
  };
}
