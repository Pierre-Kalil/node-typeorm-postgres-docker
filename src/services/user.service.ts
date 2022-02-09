import { getRepository, getCustomRepository } from "typeorm";
import { User } from "../entities";
import AppError from "../errors/App.Error";
import UserRepository from "../repositories/userRepository";
//entities
//errors
//user repository

interface UserBody {
  name: string;
  email: string;
  password: string;
  isAdm: boolean;
  createdOn: Date;
  updatedOn: Date;
}

interface UpdateBody {
  name?: string;
  email?: string;
  password?: string;
}

export const createUser = async (body: UserBody) => {
  const { name, email, password, isAdm, createdOn, updatedOn } = body;

  try {
    const userRepository = getRepository(User);
    // const verify =  await userRepository.f;
    const user = userRepository.create({
      name,
      email,
      password,
      isAdm,
      createdOn,
      updatedOn,
    });

    await userRepository.save(user);
    return {
      uuid: user.id,
      createdOn: user.createdOn,
      updatedOn: user.updatedOn,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdm,
    };
  } catch (err) {
    throw new AppError(
      `E-mail ${err.detail.slice(12, 28)} already registered`,
      404
    );
  }
};

export const listUser = async (page = 1) => {
  const userRepository = getCustomRepository(UserRepository);
  const users = await userRepository.paginated(page);
  return users;
};

export const updateUser = async (userId: string, data: UpdateBody) => {
  const userRepository = getCustomRepository(UserRepository);
  const user = await userRepository.findOne(userId);
  if (!user) {
    throw new AppError("User not found", 404);
  }
  user.updatedOn = new Date();
  return await userRepository.save({
    ...user,
    ...data,
  });
};

export const userDelete = async (userId: string) => {
  const userRepository = getCustomRepository(UserRepository);
  const user = await userRepository.findOne(userId);
  if (!user) {
    throw new AppError("User not found", 404);
  }
  userRepository.remove(user);
};
