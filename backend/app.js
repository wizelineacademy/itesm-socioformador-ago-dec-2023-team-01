const express = require('express');
const app = express();
const config = require('./auth0/auth0-config');
const { auth } = require('express-openid-connect');

app.use(auth(config));
const port = 3000

app.get('/', (req, res) => {
  res.send(req.oidc.isAuthenticated() ? 'Logged in' : 'Logged out');
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})