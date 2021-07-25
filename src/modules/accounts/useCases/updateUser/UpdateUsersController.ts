import { Request, Response } from "express";
import { container } from "tsyringe";

import { UpdateUsersService } from "./UpdateUsersService";


class UpdateUsersController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { id } = req.params
    const { name } = req.body;

    const updateUsersService = container.resolve(UpdateUsersService);

    const user = await updateUsersService.execute(id, name);

    return res.status(200).json(user);
  }
}

export { UpdateUsersController };