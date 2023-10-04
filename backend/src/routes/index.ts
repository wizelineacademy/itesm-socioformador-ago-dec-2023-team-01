import express from 'express';

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

export default router;
