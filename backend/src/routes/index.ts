import express from 'express';
import userRouter from '../modules/user/userController';
import loginRouter from '../controllers/loginController';
import groupRouter from '../controllers/groupController';
import rolesRouter from '../modules/role/roleController';

const router = express.Router();

router.use('/group', groupRouter);
router.use('/users/', userRouter);
router.use('/login', loginRouter);
router.use('/roles/', rolesRouter);

export default router;
