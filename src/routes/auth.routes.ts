import { Router } from 'express';
import { AuthenticateUserController } from '../modules/accounts/authenticateUser/AuthenticateUserController';

const authRoutes = Router();

const authenticateController = new AuthenticateUserController();

authRoutes.post('/sessions', authenticateController.handle);

export { authRoutes };