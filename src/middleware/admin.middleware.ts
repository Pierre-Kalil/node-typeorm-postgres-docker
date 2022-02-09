import { Request, Response, NextFunction } from "express";
import { getCustomRepository } from "typeorm";
import AppError from "../errors/App.Error";
import UserRepository from "../repositories/userRepository";

export const isAdmin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const admin = req.user;
  try {
    const userRepository = getCustomRepository(UserRepository);
    const user = await userRepository.findOne(admin.id);
    if (user.isAdm == false) {
      return res.status(401).json({
        status: "error",
        message: "Unauthorized",
      });
    }
    next();
  } catch (err) {
    next(err);
  }
};
