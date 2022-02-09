import { Router } from "express";
import {
  create,
  currentUser,
  list,
  update,
  deleteUser,
} from "../controller/user.controller";
import { isAdmin } from "../middleware/admin.middleware";
import { isAuthenticated } from "../middleware/auth.middleware";
import { validate } from "../middleware/validate.middleware";
import { UserSchema } from "../schemas/UserSchema";

const router = Router();

export const userRouter = () => {
  router.post("", validate(UserSchema), create);
  router.get("", isAuthenticated, isAdmin, list);
  router.get("/currentuser", isAuthenticated, currentUser);
  router.patch("/:id", isAuthenticated, update);
  router.delete("/:id", isAuthenticated, deleteUser);
  return router;
};
