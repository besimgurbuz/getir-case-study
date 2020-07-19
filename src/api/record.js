const express = require('express');
const RecordModel = require('../model/record-model');
const { recordRequestBodyValidator } = require('../middlewares');

const router = express.Router();

router.post('/', recordRequestBodyValidator, async (req, res, next) => {
  try {
    const { startDate, endDate, minCount, maxCount } = req.body;
    // 1. get all records from DB
    const records = await RecordModel.find();

    // 2. filter by given filter values
    const result = records.filter(record => {
      const createdAt = new Date(record.createdAt);
      const startD = new Date(startDate);
      const endD = new Date(endDate);

      return createdAt.getTime() >= startD.getTime() && createdAt.getTime() <= endD.getTime()
        && record.totalCount >= minCount && record.totalCount <= maxCount ? true : false;
    });

    res.json({
      code: 0,
      msg: "Success",
      records: result
    });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
