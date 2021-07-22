import { inject, injectable } from 'tsyringe';

import { ICreateUserDTO } from '../../dtos/ICreateUserDTO';
import { IUsersRepository } from "../../repositories/IUsersRepository";

@injectable()
class CreateUserService {
constructor(
  @inject('UsersRepository')
  private usersRepository: IUsersRepository
) {}

  async execute({ name, password, email }: ICreateUserDTO): Promise<void> {
    await this.usersRepository.create({
      name, 
      password, 
      email
    })
  }
}

export { CreateUserService };