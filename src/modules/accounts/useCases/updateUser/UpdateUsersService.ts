import { inject, injectable } from "tsyringe";
import { User } from "../../entities/User";

import { IUsersRepository } from "../../repositories/IUsersRepository";

@injectable()
class UpdateUsersService {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository
  ) {}

  async execute(id: string, name: string): Promise<User> {
    const user = await this.usersRepository.findById(id);

    user.name = name;

    await this.usersRepository.updateName(id, user.name);

    return user;
  }
  
}

export { UpdateUsersService };