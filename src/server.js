const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const dotenv = require('dotenv');
const chalk = require('chalk');
const cors = require('cors');
const compression = require('compression');
const { config } = require('./config/config');
const AppHttpError = require('../src/_helpers/appHttpError');

// TODO: import routes middlewares

// Start application
const app = express();
dotenv.config();

// App middlewares
// allow cors requests from any origin and with credentials
app.use(
  cors({
    origin: (origin, callback) => callback(null, true),
    credentials: true,
  })
);
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(compression());

// Statics files
app.use('/images', express.static(path.join(__dirname, '../public/images/upload')));

// Home page
app.get('/', (req, res) => {
  return res.send(`<h1 align="center">Bienfafood v1 API 5 juin 2021 - 11h43 / ${new Date()} </h1>`);
});

app.post('/posts', (req, res, next) => {
  return next(new AppHttpError('test 2', 400));
});

// Database connexion
require('./_helpers/db');

// TODO: routes middleware
app.use('/api', require('./routes/user.route'));

// error handler
app.use((req, res, next) => {
  const error = new Error(`${req.url} not found`);
  error.status = 404;
  next(error);
});

app.use(require('../src/_helpers/handlerError'));
// Start server
const host = `http://${config.server.host}:${config.server.port}`;
app.listen(config.server.port, () => {
  console.log(`${chalk.blue.bold(`Application run on`)} ${chalk.blue.bold.underline(host)}`);
});
