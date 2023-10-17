import express from 'express';
import userRouter from '../controllers/userController';
import loginRouter from '../controllers/loginController';
import groupRouter from '../controllers/groupController';
import rolesRouter from '../modules/role/roleController';

const router = express.Router();

router.get('/', (req, res) => {
  // eslint-disable-next-line no-console
  console.info(req.oidc.isAuthenticated());
  // eslint-disable-next-line no-console
  console.info('user:', req.oidc.user);
  res.render('index', {
    title: 'Express',
    isAuthenticated: req.oidc.isAuthenticated(),
    user: req.oidc.user,
  });
});

router.use('/group', groupRouter);
router.use('/user', userRouter);
router.use('/login', loginRouter);
router.use('/roles/', rolesRouter);

export default router;
