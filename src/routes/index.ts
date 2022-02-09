import { application, Express } from "express";
import { userRouter } from "./user.router";
import { loginRouter } from "./login.router";

export const inittializerRouter = (app: Express) => {
  app.use("/login", loginRouter());
  app.use("/users", userRouter());
};
