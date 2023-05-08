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
  const rabbitMQ = new MyRabbitMQ('myExchange', 'direct', 'myQueue', 'myRoutingKey');
  // Connect to RabbitMQ
  await rabbitMQ.connect();
  // Publish a message to the exchange
  await rabbitMQ.sendMessage('Hello, Duc!');
  console.log("Send message success");
  
}

try {
  connectRabbitMQ();
} catch (error) {
  console.log(error);
}
