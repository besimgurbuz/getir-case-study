const express = require('express');
const { recordRequestBodyValidator } = require('../middlewares');

const router = express.Router();

router.post('/', recordRequestBodyValidator, (req, res, next) => {
  try {
    res.json({
      msg: "Success",
    });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
