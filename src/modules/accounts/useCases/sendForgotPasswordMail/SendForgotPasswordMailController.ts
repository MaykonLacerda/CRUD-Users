import { Request, Response } from "express";
import { container } from "tsyringe";
import { SendForgotPasswordMailService } from "./SendForgotPasswordMailService";


class SendForgotPasswordMailController {
  async handle(req: Request, res: Response): Promise<Response> {

    const { email } = req.body;
    
    const sendForgotPasswordMailService = container.resolve(SendForgotPasswordMailService);

    const URLToReset = await sendForgotPasswordMailService.execute(email);

    return res.status(200).json({message:`Cole este link na URL do endpoint de resetar password: ${URLToReset}`});
  }
}

export { SendForgotPasswordMailController };