const validatorFunctions = require('./validator-functions');

/**
 * This middleware works when 404 situation happened.
 * It triggers errorHandler with not found message
 * @param {Request} req
 * @param {Response} res
 * @param {import('express').NextFunction} next
 */
function notFound(req, res, next) {
  res.status(404);
  const error = {
    message: `Aranılan adres bulunamadı - ${req.originalUrl}`,
    code: 404
  };
  next(error);
}

/* eslint-disable no-unused-vars */
function errorHandler(err, req, res, next) {
  /* eslint-disable no-unused-vars */
  const statusCode = res.statusCode !== 200 ? res.statusCode : 500;
  res.status(err.statusCode ? err.statusCode : statusCode);

  res.json({
    code: err.statusCode || err.code,
    msg: err.message
  });
}

/**
 * This middleware checks record POST method request body.
 * If body is not valid triggers errorHandler with error message.
 * @param {Request} req
 * @param {Response} res
 * @param {import('express').NextFunction} next
 */
function recordRequestBodyValidator(req, res, next) {
  const {
    startDate, endDate, minCount, maxCount
  } = req.body;
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

  /* eslint-disable no-restricted-syntax */
  for (const requirment of requirments) {
    if (!requirment.func) {
      validationResult.message = requirment.error;
      break;
    }
  }
  /* eslint-disable no-restricted-syntax */

  if (validationResult.message) {
    res.status(400);
    validationResult.code = -1;
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
