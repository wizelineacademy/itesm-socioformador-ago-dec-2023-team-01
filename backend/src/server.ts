import express from 'express';
import { auth as authOpenId } from 'express-openid-connect';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
// import axios from 'axios';
import cors from 'cors';
import Auth0Config from './configs/auth0-config';
import router from './routes/index';
import swaggerDocs from './utils/swagger';
import errorMiddleware from './middlewares/errorMiddleware';

const port = Number(process.env.PORT) || 8080;
const app = express();

dotenv.config();
app.use(express.json());
app.use(cors());
app.use(authOpenId(Auth0Config));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.set('views', './src/views');
app.set('view engine', 'ejs');
app.use('/api/', router);

app.get('/', (req, res) => {
  console.info(req.oidc.isAuthenticated());
  if (req.oidc.isAuthenticated()) {
    console.info('tokenId:', req.oidc.idToken);
    console.info('toke claims:', req.oidc.idTokenClaims);
    console.info('accessToken:', req.oidc.accessToken);
    // eslint-disable-next-line camelcase
    const { token_type, access_token } = req.oidc.accessToken || {};
    console.info('token_type:', token_type);
    console.info('accessToken:', access_token);
    // eslint-disable-next-line no-unused-expressions, camelcase
    access_token && console.info('accessToken:', jwt.decode(access_token));
    try {
      const decoded = jwt.verify(
        // eslint-disable-next-line camelcase
        access_token ?? '',
        process.env.JWT_SECRET ?? '',
      );
      console.info('JWT is valid. Decoded payload:', decoded);
    } catch (error) {
      console.error('JWT verification failed:', error);
    }
  }
  res.render('index', {
    title: 'Express',
    isAuthenticated: req.oidc.isAuthenticated(),
    user: req.oidc.user,
  });
});

app.use(errorMiddleware);
app.listen(port, () => {
  console.info(`Example app listening on port ${port}`);
  swaggerDocs(app, port);
});
