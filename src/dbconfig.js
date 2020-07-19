const mongoose = require('mongoose');
const randomKey = require('random-key');
const RecordModel = require('./model/record-model');

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
function createRandomRecord() {
  // createdAt is assigned as a random date in 2019
  const key = randomKey.generate();
  /* eslint-disable max-len */
  const createdAt = new Date(2019, (Math.random() * 11) + 1, (Math.random() * 29) + 1).toISOString();
  /* eslint-disable max-len */
  const totalCount = Math.floor(Math.random() * 1000) + 2000;

  const newRecord = new RecordModel({ key, createdAt, totalCount });

  newRecord.save((err, savedValue) => {
    if (err) console.error(err);
    else console.log(`Value saved - ${savedValue}`);
  });
}

/**
 * Creates Record Schema if not exists. And if there is no any data at records generates 5 random Records and saves to DB.
 */
function initSchema() {
  const conn = mongoose.connection;
  // be sure connection success
  conn.once('open', async () => {
    // if there is no any Record data in DB, add random generated samples
    const records = await RecordModel.find();
    if (records.length === 0) {
      /* eslint-disable no-plusplus */
      for (let i = 0; i < 5; i++) {
      /* eslint-disable no-plusplus */
        createRandomRecord(RecordModel);
      }
    }
  });
  conn.on('error', (err) => {
    console.error(err);
  });
}

module.exports = {
  connect,
  initSchema
};
