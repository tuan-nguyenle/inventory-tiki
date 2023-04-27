import * as amqp from "amqplib";
import { Subjects } from "../subjects";

interface Event {
  subject: Subjects;
  data: any;
}

export abstract class Publisher<T extends Event> {
  abstract subject: T["subject"];
  private channel: amqp.Channel;

  constructor(channel: amqp.Channel) {
    this.channel = channel;
  }

  async publish(data: T["data"]): Promise<void> {
    if (!this.channel) {
      throw new Error("Not connected to RabbitMQ");
    }

    await this.channel.assertExchange(this.subject, "fanout", {
      durable: true,
    });
    const message = Buffer.from(JSON.stringify(data));
    await this.channel.publish(this.subject, "", message, { persistent: true });

    console.log("Event published to subject", this.subject);
  }
}
