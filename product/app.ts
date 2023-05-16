import "express-async-errors";
import express from "express";
import SessionCookie from "cookie-session";
import { json } from "body-parser";
import { routes } from "./routers";
import { NotFoundError, errorsHandler } from "@microservies-inventory/common";
import { ConnectDB } from "./config/mongodb";
import dotenv from "dotenv";
import cors from "cors";
import { ProductCreatedListener } from "./event/listener/ProductCreatedListener";

const app = express();
const HOST = "8081";
dotenv.config();

app.set("trust proxy", true);

app.use(cors());
app.use(json());
app.use(
  SessionCookie({
    name: "session",
    keys: [process.env.SESSION_KEY!],
    // secure: true,
    // httpOnly: true,
    // sameSite: "strict",
    // signed: true,
    maxAge: 12 * 60 * 60 * 1000,
  })
);

app.use("/", routes);

app.all("*", async (req, res) => {
  console.log(req.protocol + "://" + req.get("host") + req.originalUrl);
  throw new NotFoundError();
});

app.use(errorsHandler);

const start = async () => {
  console.clear();
  if (
    !process.env.ACCESS_TOKEN_PUBLIC_KEY ||
    !process.env.ACCESS_TOKEN_PRIVATE_KEY
  ) {
    throw new Error("JWT_KEY must be defined");
  }

  if (!process.env.SESSION_KEY) {
    throw new Error("SESSION_KEY must be defined");
  }

  try {
    await ConnectDB();
  } catch (err) {
    console.error(err);
  }

  try {
    new ProductCreatedListener('amqp://guest:guest@rabbitmq:5672', 'Product', 'fanout', 'inventory-tiki').consumeMessages();
  } catch (err) {
    console.log(err);
  }

  app.listen(HOST, () => {
    console.log(`🟢  Listening on port ${HOST}`);
  });
};

start();
