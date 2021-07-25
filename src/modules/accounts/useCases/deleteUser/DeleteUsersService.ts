import { inject, injectable } from "tsyringe";


import { IUsersRepository } from "../../repositories/IUsersRepository";

@injectable()
class DeleteUsersService {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository
  ) {}

  async execute(id: string): Promise<void> {
    await this.usersRepository.deleteById(id);
  }
}

export { DeleteUsersService };  