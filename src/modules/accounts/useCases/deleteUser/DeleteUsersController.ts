import { Request, Response } from "express";
import { container } from "tsyringe";
import { DeleteUsersService } from "./DeleteUsersService";


class DeleteUsersController {

  async handle(req: Request, res: Response): Promise<Response> {
    const { id } = req.body;
    const deleteUsersService = container.resolve(DeleteUsersService);

    deleteUsersService.execute(id);

    return res.status(201).send();
  }
}

export { DeleteUsersController };