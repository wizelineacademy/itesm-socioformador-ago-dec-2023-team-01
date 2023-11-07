import express from 'express';

import userRouter from '../modules/user/userController';
import groupRouter from '../modules/group/groupController';
import rolesRouter from '../modules/role/roleController';
import tokenRouter from '../modules/token/tokenController';
import conversationRouter from '../modules/conversation/conversationController';
import authRouter from '../modules/auth/authController';
import languageRouter from '../modules/language/languageController';

import checkAuthorizationMiddleware from '../middlewares/authMiddleware';

const router = express.Router();

router.use('/auth/', authRouter);
router.use('/group/', checkAuthorizationMiddleware, groupRouter);
router.use('/users/', userRouter);
router.use('/roles/', checkAuthorizationMiddleware, rolesRouter);
router.use('/tokens/', tokenRouter);
router.use('/conversations/', conversationRouter);
router.use('/languages/', languageRouter);

export default router;
