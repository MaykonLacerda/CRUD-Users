import { Router } from 'express';
import { CreateUserController } from '../modules/accounts/useCases/createUser/CreateUserController';
import { DeleteUsersController } from '../modules/accounts/useCases/deleteUser/DeleteUsersController';
import { ListUsersController } from '../modules/accounts/useCases/listUser/ListUsersController';
import { UpdateUsersController } from '../modules/accounts/useCases/updateUser/UpdateUsersController';

const usersRoutes = Router();

const createUserController = new CreateUserController();
const listUsersController = new ListUsersController();
const deleteUsersController = new DeleteUsersController();
const updateUsersController = new UpdateUsersController();

usersRoutes.post('/', createUserController.handle);
usersRoutes.get('/', listUsersController.handle);
usersRoutes.post('/delete', deleteUsersController.handle);
usersRoutes.put('/update/:id', updateUsersController.handle);

export { usersRoutes };