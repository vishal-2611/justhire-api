require('dotenv').config(); // Sets up dotenv as soon as our application starts

const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const app = express();
const jwtauth = require('./utils').validateToken;

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Max-Age', 8640000);
  res.header('Access-Control-Allow-Methods', 'GET, OPTIONS, PUT, DELETE, POST');
  res.header(
    'Access-Control-Allow-Headers',
    'access-control-allow-origin,authorization,content-type'
  );
  res.header('Access-Control-Allow-Credentials', true);

  return next();
});

app.use(logger('dev'));
require('./connection')().catch(err => {
  throw err;
});

let excluded_path = ['/api/v1/user/auth', '/api/v1/user/login'];

app.use(jwtauth(excluded_path));
const routes = require('./routes/index');
app.use('/api/v1', routes);

module.exports = app;
