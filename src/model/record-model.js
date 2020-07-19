const mongoose = require('mongoose');

const { Schema } = mongoose;

const recordSchema = new Schema({
  key: String,
  createdAt: String,
  totalCount: Number
});

module.exports = mongoose.model('Record', recordSchema);
