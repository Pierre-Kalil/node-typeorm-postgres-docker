import { NextFunction, Request, Response } from "express";
import { getRepository } from "typeorm";
import { User } from "../entities";
import {
  createUser,
  listUser,
  updateUser,
  userDelete,
} from "../services/user.service";

export const create = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const data = req.validateData;
    const user = await createUser(data);
    res.send(user);
  } catch (err) {
    next(err);
  }
};

export const list = async (req: Request, res: Response) => {
  const page = (req.query.page as any) ? parseInt(req.query.page as string) : 1;
  const users = await listUser(page);
  res.send(users);
};

export const currentUser = async (req: Request, res: Response) => {
  const user = await req.user;
  res.send(user);
};

export const update = async (req: Request, res: Response) => {
  const { id } = req.params;
  const upadatedUser = await updateUser(id, req.body);
  res.send(upadatedUser);
};

export const deleteUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    await userDelete(id);

    res.sendStatus(204);
  } catch (err) {
    next(err);
  }
};
