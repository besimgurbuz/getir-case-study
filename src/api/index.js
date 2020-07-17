const express = require('express');

const helloworld = require('./helloworld');

const router = express.Router();

router.get('/', (req, res) => {
  res.json({
    message: 'API: Merhaba!!'
  });
});

router.use('/helloworld', helloworld);

module.exports = router;
