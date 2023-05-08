import { RabbitMQ } from "./base/rabbitmq";

export class MyRabbitMQ extends RabbitMQ {
  async consumeMessage(): Promise<void> {
    await this.channel.consume(this.queueName, (msg) => {
      if (msg !== null) {
        console.log(msg.content.toString());
        this.channel.ack(msg);
      }
    });
  }
}


//  Connect RabbitMQ
async function connectRabbitMQ() {
  try {
    const rabbitMQ = new MyRabbitMQ('myExchange', 'direct', 'myQueue', 'myRoutingKey');
    // Connect to RabbitMQ
    await rabbitMQ.connect();
    // Consume messages from the queue
    rabbitMQ.consumeMessage();
  } catch (error) {

  }
}
try {
  connectRabbitMQ();
} catch (error) {
  console.log(error);
}
