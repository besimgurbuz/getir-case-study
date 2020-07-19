/**
 * If value is not falsy returns true, otherwise returns false
 * @param {any} value
 */
function required(value) {
  return !!value;
}

/**
 * If a greater than b returns true, otherwise returns false
 * @param {number} a
 * @param {number} b
 */
function greaterThan(a, b) {
  return a > b;
}

/**
 * If dateA older than dateB returns true, otherwise returns false
 * @param {Date} dateA
 * @param {Date} dateB
 */
function olderThan(dateA, dateB) {
  try {
    return (new Date(dateA)).getTime() < (new Date(dateB)).getTime();
  } catch (err) {
    return false;
  }
}

/**
 * If value is a number returns true, otherwise returns false
 * @param {any} value
 */
function isNumber(value) {
  return typeof value === 'number';
}

/**
 * If value is in date format returns true, otherwise returns false
 * @param {any} value
 */
function isDate(value) {
  /* eslint-disable no-restricted-globals */
  return (new Date(value) !== 'Invalid Date') && !isNaN(new Date(value));
  /* eslint-disable no-restricted-globals */
}

module.exports = {
  required,
  greaterThan,
  olderThan,
  isNumber,
  isDate
};
