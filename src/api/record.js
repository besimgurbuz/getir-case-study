const express = require('express');
const RecordModel = require('../model/record-model');
const { recordRequestBodyValidator } = require('../middlewares');

const router = express.Router();

router.post('/', recordRequestBodyValidator, async (req, res, next) => {
  try {
    // 1. get validated request body parameters
    const {
      startDate, endDate, minCount, maxCount
    } = req.body;
    // 2. get all records from DB
    const records = await RecordModel.find();
    // 3. filter by given filter values
    const fileredRecords = records.filter((record) => {
      const createdAt = new Date(record.createdAt);
      const startD = new Date(startDate);
      const endD = new Date(endDate);

      return !!(createdAt.getTime() >= startD.getTime() && createdAt.getTime() <= endD.getTime()
        && record.totalCount >= minCount && record.totalCount <= maxCount);
    });

    // 4. remove _id and __v fields from response
    const result = fileredRecords.map((record) => {
      const recordObj = record.toJSON();
      const { _id, __v, ...properties } = recordObj;
      return properties;
    });

    // 5. response with json
    res.json({
      code: 0,
      msg: 'Success',
      records: result
    });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
