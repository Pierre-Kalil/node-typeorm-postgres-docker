import { Router } from "express";
import { login } from "../controller/login.controller";

const router = Router();

export const loginRouter = () => {
  router.post("", login);

  return router;
};
