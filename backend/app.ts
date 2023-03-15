import express from "express";
import { json } from "body-parser";
import { routes } from "./routers";
import { errorsHandler } from "./middleware/error-handler";
import { NotFoundError } from "./middleware/error/errors";
import "express-async-errors";

const app = express();
const HOST = "8080";

app.use(json());

// app.use("/users/currentuser", (req, res) => {
//   res.send(`Hi I'm user in web-app`);
// });

app.use("/", routes);

app.all("*", async (req, res) => {
  throw new NotFoundError();
});

app.use(errorsHandler);

app.listen(HOST, () => {
  console.log(`Listening on port v145 ${HOST}`);
});
