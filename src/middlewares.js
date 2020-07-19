const validatorFunctions = require('./validator-functions');

function notFound(req, res, next) {
  res.status(404);
  const error = new Error(`Aranılan adres bulunamadı - ${req.originalUrl}`);
  next(error);
}

/* eslint-disable no-unused-vars */
function errorHandler(err, req, res, next) {
  /* eslint-disable no-unused-vars */
  const statusCode = res.statusCode !== 200 ? res.statusCode : 500;
  res.status(statusCode);

  res.json({
    code: -1,
    msg: err.message
  });
}

function recordRequestBodyValidator(req, res, next) {
  const { startDate, endDate, minCount, maxCount } = req.body;
  const validationResult = {};

  const requirments = [
    {
      error: 'startDate should be given',
      func: validatorFunctions.required(startDate)
    },
    {
      error: 'endDate should be given',
      func: validatorFunctions.required(endDate)
    },
    {
      error: 'minCount should be given',
      func: validatorFunctions.required(minCount)
    },
    {
      error: 'maxCount should be given',
      func: validatorFunctions.required(maxCount)
    },
    {
      error: 'startDate should be in date format',
      func: validatorFunctions.isDate(startDate)
    },
    {
      error: 'endDate should be in date format',
      func: validatorFunctions.isDate(endDate)
    },
    {
      error: 'maxCount should be a number',
      func: validatorFunctions.isNumber(maxCount)
    },
    {
      error: 'minCount should be a number',
      func: validatorFunctions.isNumber(minCount)
    },
    {
      error: 'startDate must be older than endDate',
      func: validatorFunctions.olderThan(startDate, endDate)
    },
    {
      error: 'maxCount should be greater than minCount',
      func: validatorFunctions.greaterThan(maxCount, minCount)
    }
  ];

  for (const requirment of requirments) {
    if (!requirment.func) {
      validationResult.message = requirment.error;
      break;
    }
  }

  if (validationResult.message) {
    next(validationResult);
  } else {
    next();
  }
}

module.exports = {
  notFound,
  errorHandler,
  recordRequestBodyValidator
};
