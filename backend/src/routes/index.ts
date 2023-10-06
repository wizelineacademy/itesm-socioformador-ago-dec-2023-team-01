import express from 'express';
import userRouter from './userRoutes';
import loginRouter from './loginRoutes';

const router = express.Router();

router.get('/', (req, res) => {
  console.info(req.oidc.isAuthenticated());
  console.info('user:', req.oidc.user);
  res.render('index', {
    title: 'Express',
    isAuthenticated: req.oidc.isAuthenticated(),
    user: req.oidc.user,
  });
});

router.use('/user', userRouter);
router.use('/login', loginRouter);

export default router;
