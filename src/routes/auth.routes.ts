import { Router } from 'express';
import { AuthenticateUserController } from '../modules/accounts/authenticateUser/AuthenticateUserController';
import { RefreshTokenController } from '../modules/accounts/refreshToken/RefreshTokenController';

const authRoutes = Router();

const authenticateController = new AuthenticateUserController();
const refreshTokenController = new RefreshTokenController();

authRoutes.post('/sessions', authenticateController.handle);
authRoutes.post('/refresh-token', refreshTokenController.handle);

export { authRoutes };