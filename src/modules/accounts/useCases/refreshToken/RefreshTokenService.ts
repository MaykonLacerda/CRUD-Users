import { verify, sign } from 'jsonwebtoken';
import { inject, injectable } from 'tsyringe';
import { AppError } from '../../../../shared/errors/AppError';
import { IDateProvider } from '../../../../shared/providers/dateProvider/IDateProvider';
import { IUsersTokenRepository } from '../../repositories/IUsersTokenRepository';

interface IPayLoad {
  sub: string;
  email: string;
}

@injectable()
class RefreshTokenService {

  constructor(
    @inject("UsersTokenRepository")
    private usersTokenRepository: IUsersTokenRepository,
    @inject("DayJSDateProvider")
    private dateProvider: IDateProvider,
  ) {}

  async execute(token: string): Promise<string> {
    const { email, sub } = verify(token, process.env.REFRESH_TOKEN) as IPayLoad;
    
    const user_id = sub;

    const userToken = await this.usersTokenRepository.findByUserIdAndRefreshTokens(user_id, token);

    if(!userToken) {
      throw new AppError("Refresh Token does not exists!", 400);
    }

    await this.usersTokenRepository.deleteById(userToken.id);
    
    const refresh_token = sign({ email }, `${process.env.REFRESH_TOKEN}`, {
      subject: sub,
      expiresIn: `${process.env.EXPIRES_REFRESH_TOKEN}`
    });
    
    const expires_date = this.dateProvider.addDays(parseInt(`${process.env.EXPIRES_REFRESH_TOKEN_DAYS}`));


    await this.usersTokenRepository.create({
      expires_date,
      refresh_token,
      user_id
    })

    return refresh_token;
  }
}

export { RefreshTokenService };