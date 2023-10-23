import express from 'express';
import { auth } from 'express-openid-connect';
import axios from 'axios';
import config from './configs/auth0-config';
import router from './routes/index';
import swaggerDocs from './utils/swagger';
import errorMiddleware from './middlewares/errorMiddleware';

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
  console.info(req.oidc.isAuthenticated());
  if (req.oidc.isAuthenticated()) {
    console.info('tokenId:', req.oidc.idToken);
    console.info('toke claims:', req.oidc.idTokenClaims);
    const { user } = req.oidc;
    try {
      axios
        .get(`${process.env.BASE_URL}/api/users/${user?.sub}`)
        .then(response => {
          console.info(response.data);
        });
    } catch (error) {
      console.info('error:', error);
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
