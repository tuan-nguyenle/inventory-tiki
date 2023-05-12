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
  const rabbitMQ = new MyRabbitMQ('amqp://localhost:5673', 'Orders', 'fanout', 'inventory-tiki');
  // Connect to RabbitMQ
  // Publish a message to the exchange
  await rabbitMQ.publishMessage({ id: "13332", title: "1234", price: 123, userId: "1234" });
}

try {
  connectRabbitMQ();
} catch (error) {
  console.log(error);
}
