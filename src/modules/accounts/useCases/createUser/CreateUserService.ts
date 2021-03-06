import { inject, injectable } from 'tsyringe';
import { hash } from 'bcryptjs';

import { ICreateUserDTO } from '../../dtos/ICreateUserDTO';
import { IUsersRepository } from "../../repositories/IUsersRepository";
import { AppError } from '../../../../shared/errors/AppError';

@injectable()
class CreateUserService {
constructor(
  @inject('UsersRepository')
  private usersRepository: IUsersRepository
) {}

  async execute({ name, password, email }: ICreateUserDTO): Promise<void> {

    const usersAlreadyExist = await this.usersRepository.findByEmail(email);

    if(usersAlreadyExist) {
      throw new AppError("User already exists!", 400);
    }

    const passwordHash = await hash(password, 8);

    await this.usersRepository.create({
      name, 
      password: passwordHash, 
      email
    })
  }
}

export { CreateUserService };