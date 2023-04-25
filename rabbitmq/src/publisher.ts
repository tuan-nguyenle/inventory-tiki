import * as amqplib from "amqplib";
const queue = "demo";

var connection;

// Kết nối RabbitMQ
async function connectRabbitMQ() {
  try {
    connection = await amqplib.connect("amqp://localhost:5673");
    console.info("connect to RabbitMQ success");

    const channel = await connection.createChannel();
    await channel.assertQueue(queue);
    await channel.sendToQueue(queue, Buffer.from("Hello, Anonystick!"), {
      // RabbitMQ - Khi khởi động lại, tiếp tục chạy
      persistent: true,
    });

    connection.on("error", function (err) {
      console.log(err);
      setTimeout(connectRabbitMQ, 10000);
    });

    connection.on("close", function () {
      console.error("connection to RabbitQM closed!");
      setTimeout(connectRabbitMQ, 10000);
    });
  } catch (err) {
    console.error(err);
    setTimeout(connectRabbitMQ, 10000);
  }
}

connectRabbitMQ();
