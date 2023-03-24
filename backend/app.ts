import "express-async-errors";
import express from "express";
import SessionCookie from "cookie-session";
import { json } from "body-parser";
import { routes } from "./routers";
import { errorsHandler } from "./middleware/error-handler";
import { NotFoundError } from "./middleware/error/errors";
import { ConnectDB } from "./config/mongodb";
import dotenv from "dotenv";
import cors from "cors";

const app = express();
const HOST = "8080";
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
  console.log(`
⟫⟫       Inventory Web App       ⟪⟪
⢀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀
⢐⠀⠀⠀⠀⠀⢀⠀⠀⠀⠀⠀⠀⠀⠐⠀⠀⠀⠀⣀⠀⢀⠀⠀⠀⠐⠀⠀⠂⢐⠠⢀⠂ ⢐
⢐ ⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⠀⠠⠁⠀⠈⠀⠀⠀⠀⢀⠠⠀⠀⠀⠀⠤⠈⠡⠂⠀ ⢐
⢐ ⠀⠀⠀⠀⠀⢈⠀⠀⠀⠀⠂⠀⠀⠀⠀⠀⠀⠀⠀⢀⠁⠀⠀⠈⠀⠈⠀⠀⢁⠠⠈⡀⢐
⢐ ⠀⠀⠀⠀⠀⠈⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠁⠀⠀⠀⠂⠂⡁⠀⢐
⢐ ⠀⠀⠀⠀⠀⠐⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠄⠠⠀⠀⠀⡂⠀⡀⠠⠔⠀  ⢐
⢐ ⠀⠀⠀⠀⠀⠠⠆⠀⠀⠀⠀⠀⠀⠀⡀⢀⣀⣄⡀⠀⠀⠀⠀⠀⠀⢀⠀⠀⠀⠀⠠⠈⢐
⢐ ⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢰⡾⢻⣿⣿⣿⣿⣶⠀⠁⠀⠀⠠⠀⠀⠀⠐⠀⠂⠀⢐
⢐ ⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⡾⠟⢹⣿⣿⣿⣿⣿⣧⠀⠀⠠⠀⠀⠄⠁⠂⠀⠂⠐⢐
⢐ ⠀⠀⠀⠀⠀⠀⠆⠀⠀⠀⠀⠀⢧⠀⠈⣿⣿⣿⣿⣿⣿⠃⠀⠀⠀⠠⠀⠀⠀⡀⠀⡀⢐
⢐ ⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠉⢶⣶⣿⣿⣿⣿⣿⣿⡆⠀⠄⠀⠐⠀⠂⠀⠘⠂⠄⢐
⢐ ⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢐⣚⣿⡟⣿⣿⢋⣏⠞⡂⠄⠀⠐⠐⠰⠀⠀⠁⡀⡀⢐
⢐ ⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⢉⠙⡱⠀⢙⢀⢷⡶⣭⣄⠀⠀⢂⠘⠄⣃⠠⠁⢀⢐
⢐ ⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⡀⠀⡀⠀⠀⢠⣶⢦⠐⡞⡧⣸⡖⡄⡀⠀⠄⠈⠈⠂⠒⠀⢐
⢐ ⠀⠀⠀⠀⠀⠀⠀⠀⠀⠡⣥⠈⣤⠈⣞⢘⠿⠿⣂⣛⡒⠄⣇⣀⠀⠀⡀⠠⠀⡀⠀⢀⢐
⢐ ⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⠿⠀⢈⠥⠹⢿⣬⣷⠌⠣⢑⡆⣭⣧⠀⠀⠀⢂⠀⠀⠀⠀⢐
⢐⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣁⣉⣉⣓⣚⣧⣾⣿⣿⣆⣁⣐⣀⣀⣀⣐⣀⣀⢐
    `);
  if (!process.env.JWT_KEY) {
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
  app.listen(HOST, () => {
    console.log(`🟢  Listening on port ${HOST}`);
  });
};

start();
