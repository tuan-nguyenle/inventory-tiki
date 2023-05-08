import amqp from 'amqplib';

interface Event{
  subject:
}

export abstract class RabbitMQ {
  protected connection!: amqp.Connection;
  protected channel!: amqp.Channel;
  protected exchangeName: string;
  protected exchangeType: string;
  protected queueName: string;
  protected routingKey: string;

  constructor(
    exchangeName: string,
    exchangeType: string,
    queueName: string,
    routingKey: string,
  ) {
    this.exchangeName = exchangeName;
    this.exchangeType = exchangeType;
    this.queueName = queueName;
    this.routingKey = routingKey;
  }

  async connect(): Promise<void> {
    this.connection = await amqp.connect('amqp://localhost:5673');
    this.channel = await this.connection.createChannel();

    await this.channel.assertExchange(this.exchangeName, this.exchangeType);
    await this.channel.assertQueue(this.queueName);
    await this.channel.bindQueue(this.queueName, this.exchangeName, this.routingKey);
  }

  async sendMessage(message: string): Promise<void> {
    await this.channel.publish(this.exchangeName, this.routingKey, Buffer.from(message));
  }

  abstract consumeMessage(): Promise<void>;
}
