import { inject, injectable } from "tsyringe";
import { AppError } from "../../../../shared/errors/AppError";
import { v4 as uuidV4 } from 'uuid';

import { IUsersRepository } from "../../repositories/IUsersRepository";
import { IUsersTokenRepository } from "../../repositories/IUsersTokenRepository";
import { IDateProvider } from "../../../../shared/providers/dateProvider/IDateProvider";
import { IMailProvider } from "../../../../shared/providers/mailProvider/IMailProvider";

@injectable()
class SendForgotPasswordMailService {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository,
    @inject ("UsersTokenRepository")
    private usersTokenRepository: IUsersTokenRepository,
    @inject("DayJSDateProvider")
    private dateProvider: IDateProvider,
    @inject("EtherealMailProvider")
    private mailProvider: IMailProvider
  ) {}

  async execute(email:string) {
    const user = await this.usersRepository.findByEmail(email);

    if(!user) {
      throw new AppError("User does not exists!", 404);
    }

    const token = uuidV4();

    const expires_date = this.dateProvider.addHours(3);

    await this.usersTokenRepository.create({
      refresh_token: token,
      user_id: user.id,
      expires_date
    });

    const variables = {
      name: user.name,
      link: `${process.env.FORGOT_MAIL_URL}${token}`
    }

    const link = variables.link;

    await this.mailProvider.sendMail(email, "Recuperação de senha", `Olá ${variables.name}, o link para a troca de senha é: ${variables.link}`);

    return link;
  }
}

export { SendForgotPasswordMailService };