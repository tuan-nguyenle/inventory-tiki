import express from "express";
import { json } from "body-parser";
import { routes } from "./routers";
import { errorsHandler } from "./middleware/error-handler";
import { NotFoundError } from "./middleware/error/errors";
import { ConnectDB } from "./config/mongodb";
import "express-async-errors";

const app = express();
const HOST = "8080";

app.use(json());

app.use("/", routes);

app.all("*", async (req, res) => {
  throw new NotFoundError();
});

app.use(errorsHandler);

const start = async () => {
  try {
    await ConnectDB();
  } catch (err) {
    console.error(err);
  }
  app.listen(HOST, () => {
    console.log(`Listening on port ${HOST}`);
  });
};

start();
