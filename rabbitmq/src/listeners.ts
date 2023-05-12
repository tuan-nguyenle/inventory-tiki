import { RabbitMQ } from "./base/rabbitmq";
import { Subjects } from "./base/subject";

export class MyRabbitMQ extends RabbitMQ<TicketCreatedEvent> {
  readonly queueName!: Subjects.TransferToPallet;
}

export interface TicketCreatedEvent {
  subject: Subjects.TransferToPallet;
  data: {
    id: string;
    title: string;
    price: number;
    userId: string;
  };
}

//  Connect RabbitMQ
async function connectRabbitMQ() {
  try {
    const rabbitMQ = new MyRabbitMQ('amqp://localhost:5673', 'Orders', 'fanout', 'inventory-tiki');
    // Connect to RabbitMQ
    // Consume messages from the queue
    rabbitMQ.consumeMessages();
  } catch (error) {
  }
}
try {
  connectRabbitMQ();
} catch (error) {
  console.log(error);
}
