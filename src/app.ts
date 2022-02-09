import "reflect-metadata";
import express from "express";

import { inittializerRouter } from "./routes";
import { connectDatabase } from "./database";
import { errorHandler } from "./middleware/error.middleware";

connectDatabase();

const app = express();
app.use(express.json());

inittializerRouter(app);

app.get("/", (req, res) => {
  res.send({ message: "ok ok" });
});

app.use(errorHandler);

export default app;
