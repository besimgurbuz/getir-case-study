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
    code: 'Fail',
    msg: err.message
  });
}

function recordRequestBodyValidator(req, res, next) {
  const validator = require('validator');

  const { startDate, endDate, minCount, maxCount } = req.body;
  const validationResult = {};

  // TODO make this mess beautiful
  if (!validator.isDate(startDate)) {
    validationResult.message = `'startDate' property should be in date format`;
  } else if (!validator.isDate(endDate)) {
    validationResult.message = `'endDate' property should be in date format`;
  } else if (typeof minCount !== 'number') {
    validationResult.message = `'minCount' property should be a number`;
  } else if (typeof maxCount !== 'number') {
    validationResult.message = `'maxCount' property should be a number`;
  } else if (minCount > maxCount) {
    validationResult.message = `'minCount' property cannot be greater than 'maxCount' property`
  } else if (minCount === maxCount) {
    validationResult.message = `'minCount' and 'maxCount' properties cannot be equal`;
  }

  if (validationResult.message) {
    validationResult.code = 1;
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
