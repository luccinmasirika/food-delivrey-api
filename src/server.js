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
app.use(
  '/images',
  express.static(path.join(__dirname, '../public/images/uploads'))
);

// Home page
app.get('/', (req, res) => {
  return res.send('<h1>Bienfafood API - v1 (31-07-2021 )</h1>');
});

// Database connexion
require('./_helpers/db');

// TODO: routes middleware
app.use('/api', require('./routes/user.route'));
app.use('/api', require('./routes/auth.route'));
app.use('/api', require('./routes/type.route'));
app.use('/api', require('./routes/ets.route'));
app.use('/api', require('./routes/menu.route'));
app.use('/api', require('./routes/plat.route'));
app.use('/api', require('./routes/client.route'));
app.use('/api', require('./routes/config.route'));
app.use('/api', require('./routes/commande.route'));

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
  console.log(
    `${chalk.yellow.bold(`Application run on`)} ${chalk.blue.bold.underline(
      host
    )}`
  );
});
