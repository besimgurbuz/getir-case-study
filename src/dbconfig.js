const mongoose = require('mongoose');
const randomKey = require('random-key');
const Record = require('./model/record');

const { DB_USERNAME, DB_PASSWORD } = process.env;

/**
 * Connect to the MongoDB
 */
function connect() {
  /* eslint-disable no-console */
  const connection_url = `mongodb://${DB_USERNAME}:${DB_PASSWORD}@ds129536.mlab.com:29536/getir-case-study`;
  mongoose.connect(connection_url, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
    console.log('Connected successfully to MongoDB');
    /* eslint-disable no-console */
  }).catch((error) => {
    console.error(error);
  });
}

/**
 * Generates randomly filled record and saves to DB
 * @param {mongoose.Model} RecordModel
 */
function createRandomRecord(RecordModel) {
  // createdAt is assigned as a random date in 2019
  const key = randomKey.generate();
  const createdAt = new Date(2019, (Math.random() * 11) + 1, (Math.random() * 29) + 1).toISOString();
  const totalCount = Math.floor(Math.random() * 1000) + 2000;

  const newRecord = new RecordModel({ key, createdAt, totalCount });

  newRecord.save(function (err, savedValue) {
    if (err) console.error(err);
    else console.log(`Value saved - ${savedValue}`);
  });
}

/**
 * Creates Record Schema if not exists. And if there is no any data at records generates 5 random Records and saves to DB.
 */
function initSchema() {
  const conn = mongoose.connection;
  conn.once('open', async () => {
    // connected to DB
    const recordSchema = new mongoose.Schema(Record);
    const RecordModel = mongoose.model('Record', recordSchema);
    // if there is no any Record data in DB, add random generated samples
    const records = await RecordModel.find();
    if (records.length === 0) {
      for (let i = 0; i < 5; i++) {
        createRandomRecord(RecordModel);
      }
    }
  });
  conn.on('error', err => {
    console.error(err);
  });
}

module.exports = {
  connect,
  initSchema
};
