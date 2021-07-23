import { inject, injectable } from "tsyringe";
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';

import { AppError } from "../../../../shared/errors/AppError";
import { IUsersRepository } from "../../repositories/IUsersRepository";
import { IUsersTokenRepository } from "../../repositories/IUsersTokenRepository";
import { IDateProvider } from "../../../../shared/providers/dateProvider/IDateProvider";


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
  refresh_token: string;
}

@injectable()
class AuthenticateUserService {
  constructor(
    @inject("UsersRepository")
    private userRepository: IUsersRepository,
    @inject("UsersTokenRepository")
    private usersTokenRepository: IUsersTokenRepository,
    @inject("DayJSDateProvider")
    private dateProvider: IDateProvider,
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
      expiresIn: `${process.env.EXPIRES_TOKEN}`
    });

    const refresh_token = sign({ email }, `${process.env.REFRESH_TOKEN}`, {
      subject: user.id,
      expiresIn: `${process.env.ESPIRES_REFRESH_TOKEN}`
    });

    const refresh_token_date = this.dateProvider.addDays(parseInt(`${process.env.ESPIRES_REFRESH_TOKEN_DAYS}`));

    await this.usersTokenRepository.create({
      user_id: user.id,
      refresh_token: refresh_token,
      expires_date: refresh_token_date
    })

    const tokenReturn: IResponse = {
      token,
      user: {
        name: user.name,
        email: user.email
      },
      refresh_token
    };

    return tokenReturn;
  }
}

export { AuthenticateUserService };