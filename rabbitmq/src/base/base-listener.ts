import * as amqp from "amqplib";
import { Subjects } from "../subjects";

interface Event {
  subject: Subjects;
  data: any;
}

export abstract class Listener<T extends Event> {
  abstract subject: T["subject"];
  abstract queueName: string;
  abstract onMessage(data: T["data"], message: any): void;
  protected channel: any;

  constructor(
    private host: string,
    private exchange: string,
    private routingKey: string
  ) {}

  async connect() {
    const connection = await amqp.connect(this.host);
    this.channel = await connection.createChannel();
    await this.channel.assertExchange(this.exchange, "topic", {
      durable: true,
    });
    await this.channel.assertQueue(this.queueName, { durable: true });
    await this.channel.bindQueue(
      this.queueName,
      this.exchange,
      this.routingKey
    );
  }

  async listen() {
    await this.connect();
    await this.channel.consume(this.queueName, (message: any) => {
      console.log(`Message received: ${this.subject} / ${this.queueName}`);
      const parsedData = this.parseMessage(message);
      this.onMessage(parsedData, message);
      this.channel.ack(message);
    });
  }

  parseMessage(message: any) {
    const data = message.content.toString();
    return JSON.parse(data);
  }
}
