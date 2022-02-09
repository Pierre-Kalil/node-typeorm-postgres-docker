import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { getCustomRepository } from "typeorm";
import UserRepository from "../repositories/userRepository";

export const authenticateUser = async (email: string, password: string) => {
  const userRepository = getCustomRepository(UserRepository);
  const user = await userRepository.findByEmail(email);

  if (user === undefined || !bcrypt.compareSync(password, user.password)) {
    return { message: "Wrong email/password" };
  }

  const token = jwt.sign({ id: user.id }, process.env.SECRET as string, {
    expiresIn: "1d",
  });

  return token;
};
