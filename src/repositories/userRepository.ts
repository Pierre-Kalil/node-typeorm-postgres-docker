import { EntityRepository, Repository } from "typeorm";
import { User } from "../entities";

@EntityRepository(User)
class UserRepository extends Repository<User> {
  public async paginated(page = 1): Promise<User[] | undefined> {
    const users = await this.find({
      order: {
        email: "ASC",
      },
      take: 5,
      skip: (page - 1) * 5,
    });
    return users;
  }

  public async findByEmail(email: string): Promise<User | undefined> {
    const user = await this.findOne({
      where: {
        email,
      },
    });
    return user;
  }
}

export default UserRepository;
