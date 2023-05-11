import amqp from "amqplib";

class rabbitMQ {
    private _connection: amqp.Connection | null = null;

    async connect(uri: string): Promise<void> {
        this._connection = await amqp.connect(uri);
        console.log("🟢  Connected to RabbitMQ with port 5672");
    }

    get connection() {
        if (!this._connection) {
            throw new Error("Can access to Rabbit Message Queue");
        }
        return this._connection;
    }
}

export const RabbitMQ = new rabbitMQ();