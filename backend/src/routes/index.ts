import express from 'express';
import userRouter from '../modules/user/userController';
import groupRouter from '../modules/group/groupController';
import rolesRouter from '../modules/role/roleController';

import authRouter from '../modules/auth/authController';
import checkAuthorizationMiddleware from '../middlewares/authMiddleware';

const router = express.Router();

router.use('/auth/', authRouter);
router.use('/group/', checkAuthorizationMiddleware, groupRouter);
router.use('/users/', userRouter);
router.use('/roles/', checkAuthorizationMiddleware, rolesRouter);

export default router;
