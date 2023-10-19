import express from 'express';
import { auth } from 'express-openid-connect';
import dotenv from 'dotenv';
import axios from 'axios';
import config from './configs/auth0-config';
// import guard from 'express-jwt-permissions';
import router from './routes/index';
import swaggerDocs from './utils/swagger';
import errorMiddleware from './middlewares/errorMiddleware';

dotenv.config({ path: '../.env' });
const port = Number(process.env.PORT) || 8080;
const app = express();
// const appGuard = guard();

app.use(express.json());
// @ts-ignore
app.use(auth(config));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.set('views', './src/views');
app.set('view engine', 'ejs');
app.use('/api/', router);

app.get('/', (req, res) => {
  // eslint-disable-next-line no-console
  console.info(req.oidc.isAuthenticated());
  // eslint-disable-next-line no-console
  // console.info('tokenId:', req.oidc.idToken);
  // console.info('toke claims:', req.oidc.idTokenClaims);
  // console.info('user:', req.oidc.user);
  if (req.oidc.isAuthenticated()) {
    const { user } = req.oidc;
    axios.get(`http://localhost:8080/api/users/${user?.sub}`).then(response => {
      console.info('responsedata:', response.data);
    });
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
