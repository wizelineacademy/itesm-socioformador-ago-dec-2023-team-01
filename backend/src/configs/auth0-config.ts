import dotenv from 'dotenv';

dotenv.config();

const config = {
  routes: {login: false},
  authRequired: false,
  auth0Logout: true,
  secret: process.env.SECRET,
  baseURL: process.env.BASE_URL,
  clientID: process.env.CLIENT_ID,
  issuerBaseURL: process.env.ISSUER_BASE_URL,
  idpLogout: true,
};


export default config;
