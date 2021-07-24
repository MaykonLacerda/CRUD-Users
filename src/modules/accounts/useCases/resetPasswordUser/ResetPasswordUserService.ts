import { inject, injectable } from "tsyringe";
import { AppError } from "../../../../shared/errors/AppError";
import { IDateProvider } from "../../../../shared/providers/dateProvider/IDateProvider";
import { IUsersRepository } from "../../repositories/IUsersRepository";
import { IUsersTokenRepository } from "../../repositories/IUsersTokenRepository";
import { hash } from 'bcryptjs';

interface IRequest {
  token: string;
  password: string;
}

@injectable()
class ResetPasswordUserService {
  constructor(
    @inject("UsersRepository")
    private userRepository: IUsersRepository,
    @inject("UsersTokenRepository")
    private usersTokenRepository: IUsersTokenRepository,
    @inject("DayJSDateProvider")
    private dateProvider: IDateProvider,
  ) {}

  async execute({ token, password }: IRequest): Promise<void> {
    const userToken = await this.usersTokenRepository.findByRefreshToken(token);
    
    if(!userToken) {
      throw new AppError("Token invalid!", 404)
    }

    if(this.dateProvider.compareBefore(userToken.expires_date, this.dateProvider.dateNow())){
      throw new AppError("Token expired!")
    }

    const user = await this.userRepository.findById(userToken.user_id);
    
    const passwordHash = await hash(password, 8);

    user.password = passwordHash;
    
    await this.userRepository.updatePassword(user.password, userToken.user_id);

    await this.usersTokenRepository.deleteById(userToken.id);
  }
}

export { ResetPasswordUserService };