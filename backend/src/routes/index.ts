import express from 'express';
import userRouter from '../modules/user/userController';
import groupRouter from '../modules/group/groupController';
import rolesRouter from '../modules/role/roleController';

import authRouter from '../modules/auth/authController';
import checkAuthorization from '../middlewares/authMiddleware';

const router = express.Router();

router.use('/auth/', authRouter);
router.use('/group/', checkAuthorization, groupRouter);
router.use('/users/', checkAuthorization, userRouter);
router.use('/roles/', checkAuthorization, rolesRouter);

export default router;
