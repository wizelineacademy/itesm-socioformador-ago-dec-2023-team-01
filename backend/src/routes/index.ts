import express from 'express';
import userRouter from '../modules/user/userController';
import groupRouter from '../modules/group/groupController';
import rolesRouter from '../modules/role/roleController';

const router = express.Router();

router.use('/group', groupRouter);
router.use('/users/', userRouter);
router.use('/roles/', rolesRouter);

export default router;
