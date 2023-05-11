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

    this.channel.assertExchange(this.exchangeName, 'fanout', { durable: false });
    this.channel.publish(this.exchangeName, '', Buffer.from(message));

    console.log(`Message '${message}' sent to exchange '${this.exchangeName}'`);
  }

  async consumeMessages(onMessageCallback: (message: T['data']) => void): Promise<void> {
    if (!this.channel) {
      await this.connect();
    }

    await this.channel.assertQueue(this.queueName, { durable: false });
    await this.channel.consume(this.queueName, (msg) => {
      const message = msg!.content.toString();
      console.log(`Received message '${message}' from queue '${this.queueName}'`);
      onMessageCallback(message);
    }, { noAck: true });
  }
}

// export abstract class RabbitMQ<T extends Event> {
//   protected connection!: amqp.Connection;
//   protected channel!: amqp.Channel;
//   protected exchangeName: string;
//   protected exchangeType: string;
//   abstract queueName: T['subject'];
//   protected routingKey: string;

//   constructor(
//     exchangeName: string,
//     exchangeType: string,
//     routingKey: string,
//   ) {
//     this.exchangeName = exchangeName;
//     this.exchangeType = exchangeType;
//     this.routingKey = routingKey;

//     this.setup().then(() => {
//       console.log("RabbitMQ setup completed");
//     });
//   }

//   async setup(): Promise<void> {
//     try {
//       this.connection = await amqp.connect('amqp://guest:guest@rabbitmq:5672');
//       this.channel = await this.connection.createChannel();

//       await this.channel.assertExchange(this.exchangeName, this.exchangeType);
//       await this.channel.assertQueue(this.queueName);
//       await this.channel.bindQueue(this.queueName, this.exchangeName, this.routingKey);
//     } catch (error) {
//       console.error('Error setting up RabbitMQ:', error);
//       throw error;
//     };
//   }
//   async sendMessage(message: T['data']): Promise<void> {
//     try {
//       const messageBuffer = Buffer.from(JSON.stringify(message));
//       const result = await this.channel.publish(this.exchangeName, this.routingKey, messageBuffer);
//       if (!result) {
//         console.error('Error publishing message:', message);
//         throw new Error('Error publishing message');
//       }
//       console.log('Message published successfully:', message);
//     } catch (error) {
//       console.error('Error publishing message:', error);
//       throw error;
//     }
//   }

//   async consumeMessage(): Promise<void> {
//     try {
//       await this.channel.consume(this.queueName, (msg) => {
//         if (msg !== null) {
//           console.log(msg.content.toString());
//           // this.channel.ack(msg);
//         }
//       }, { noAck: true });
//     } catch (error) {
//       console.error('Error consuming message:', error);
//       throw error;
//     }
//   };
  // async sendMessage(message: T['data']): Promise<void> {
  //   await this.channel.publish(this.exchangeName, this.routingKey, Buffer.from(JSON.stringify(message)));
  // }

  // async consumeMessage(): Promise<void> {
  //   await this.channel.bindQueue(this.queueName, this.exchangeName, this.routingKey);
  //   await this.channel.consume(this.queueName, (msg) => {
  //     if (msg !== null) {
  //       console.log(msg.content.toString());
  //       // this.channel.ack(msg);
  //     }
  //   }, { noAck: true });
  // };
// }
