import express, { json, urlencoded } from 'express';

const app = express();
import config from './auth0/auth0-config.js';
import router from './src/routes/index.js';
const port = 3000;
import { auth } from 'express-openid-connect';

app.set('views', './src/views');
app.set('view engine', 'ejs');
app.set(json());
app.set(urlencoded({ extended: true }));
app.use(express.static('public'));

app.use(auth(config));
app.use('/', router);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
