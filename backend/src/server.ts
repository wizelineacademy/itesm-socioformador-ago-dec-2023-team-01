import express from 'express';
import { auth } from 'express-openid-connect';
import config from './configs/auth0-config';
import router from './routes/index';



const port = 8080;
const app = express();

app.use(auth(config));
app.use('/', router);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.set('views', './src/views');
app.set('view engine', 'ejs');


app.listen(port, () => {
  console.info(`Example app listening on port ${port}`);
});
