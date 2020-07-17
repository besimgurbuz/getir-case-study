const express = require('express');
const cors = require('cors');

require('dotenv').config();

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

module.exports = app;
