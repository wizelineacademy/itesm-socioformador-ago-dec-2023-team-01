import express from 'express';
const router = express.Router();

router.get('/', (req, res) => {
  console.log(req.oidc.isAuthenticated());
  console.log('user:', req.oidc.user);
  res.render('index', {
    title: 'Express',
    isAuthenticated: req.oidc.isAuthenticated(),
    user: req.oidc.user,
  });
});


export default router;
