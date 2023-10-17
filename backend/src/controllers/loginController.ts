import express from 'express';

const loginRouter = express.Router();

loginRouter.get('/', (_req, res) => {
  res.oidc.login({
    returnTo: 'http://localhost:8080/user/create',
    authorizationParams: {
      redirect_uri: 'http://localhost:8080/callback',
    },
  });
});

export default loginRouter;
