import { inject, injectable } from "tsyringe";
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';

import { IUsersRepository } from "../repositories/IUsersRepository";
import { AppError } from "../../../shared/errors/AppError";

interface IRequest {
  email: string;
  password: string;
}

interface IResponse {
  user: {
    name: string,
    email: string
  };
  token: string;
}

@injectable()
class AuthenticateUserService {
  constructor(
    @inject("UsersRepository")
    private userRepository: IUsersRepository
  ) {}

  async execute({ email, password }: IRequest): Promise<IResponse>{

    const user = await this.userRepository.findByEmail(email);
    
    if(!user) {
      throw new AppError("Email or password incorrect!", 404);
    };
    
    const passwordMatch = await compare(password, user.password);

    if(!passwordMatch) {
      throw new AppError("Email or password incorrect!", 404);
    };

    const token = sign({}, `${process.env.JWT_KEY}`, {
      subject: user.id,
      expiresIn: '1d'
    });

    const tokenReturn: IResponse = {
      token,
      user: {
        name: user.name,
        email: user.email
      }
    };

    return tokenReturn;
  }
}

export { AuthenticateUserService };