const express = require('express');

const record = require('./record');

const router = express.Router();

router.get('/', (req, res) => {
  res.json({
    message: 'API: Merhaba!!'
  });
});

router.use('/record', record);

module.exports = router;
