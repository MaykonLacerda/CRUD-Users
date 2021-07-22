import { Request, Response } from "express";
import { container } from "tsyringe";
import { AuthenticateUserService } from "./AuthenticateUserService";


class AuthenticateUserController{
  async handle(req: Request, res: Response): Promise<Response> {
    const { email, password } = req.body;

    const authenticateService = container.resolve(AuthenticateUserService);

    const token = await authenticateService.execute({ email, password });

    return res.json(token);
  }
}

export { AuthenticateUserController };