const express = require('express');
const cors = require('cors');
// with dotenv config() function call app will able to use .env variables
require('dotenv').config();

const middlewares = require('./middlewares');
const api = require('./api');

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.json({
    message: 'Merhaba Getir Case Study\'e Hoşgeldin!',
  });
});

app.use('/api/v1', api);

// middlewares
app.use(middlewares.notFound);
app.use(middlewares.errorHandler);

module.exports = app;
