import express from 'express';
import swaggerUi from 'swagger-ui-express';
import { auth } from 'express-openid-connect';
import config from './configs/auth0-config';
import router from './routes/index';
import swaggerDocument from './swagger_output.json';


const port = 8080;
const app = express();

app.use(auth(config));
app.use(express.json());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.set('views', './src/views');
app.set('view engine', 'ejs');

app.use('/', router);

app.listen(port, () => {
  console.info(`Example app listening on port ${port}`);
});
