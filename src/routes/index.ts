import { Router } from 'express';
import { authRoutes } from './auth.routes';
import { passwordRoutes } from './password.routes';

import { usersRoutes } from './users.routes';

const router = Router();

router.use('/users', usersRoutes);
router.use(authRoutes);
router.use('/password', passwordRoutes);

export { router };