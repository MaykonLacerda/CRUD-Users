import { Request, Response } from "express";
import { container } from "tsyringe";
import { RefreshTokenService } from "./RefreshTokenService";


class RefreshTokenController {
  async handle(req: Request, res: Response): Promise<Response> {
    const token = req.body || req.headers["x-acess-token"] || req.query.token;

    const refreshTokenService = container.resolve(RefreshTokenService);

    const refresh_token = await refreshTokenService.execute(token);

    return res.json(refresh_token)
  }
}

export { RefreshTokenController };