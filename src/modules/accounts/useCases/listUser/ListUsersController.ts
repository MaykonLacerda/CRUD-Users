import { Request, Response } from "express";
import { container } from "tsyringe";
import { ListUsersService } from "./ListUsersService";


class ListUsersController {

  async handle(req: Request, res: Response): Promise<Response> {
    const listUsersService = container.resolve(ListUsersService);

    const users = await listUsersService.execute();

    return res.json(users);
  }
}

export { ListUsersController };