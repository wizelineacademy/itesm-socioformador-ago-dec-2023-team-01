import express from 'express';
import config from './configs/auth0-config';
import router from './routes/index';
import userRouter from './routes/userRoutes';
import { auth } from 'express-openid-connect';

const port = 8080;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.set('views', './src/views');
app.set('view engine', 'ejs');

app.use(auth(config));
app.use('/', router);
app.use('/user', userRouter);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
