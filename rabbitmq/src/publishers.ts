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
  const rabbitMQ = new MyRabbitMQ('Hi', 'fanout', 'myRoutingKey');
  // Connect to RabbitMQ
  await rabbitMQ.connect();
  // Publish a message to the exchange
  await rabbitMQ.sendMessage({ id: "12", title: "1234", price: 123, userId: "1234" });
  console.log("Send message success");
}

try {
  connectRabbitMQ();
} catch (error) {
  console.log(error);
}
