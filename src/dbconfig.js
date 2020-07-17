const mongoose = require('mongoose');

const { DB_USERNAME, DB_PASSWORD } = process.env;

function connect() {
  /* eslint-disable no-console */
  const connection_url = `mongodb://${DB_USERNAME}:${DB_PASSWORD}@ds129536.mlab.com:29536/getir-case-study`;
  mongoose.connect(connection_url, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
    console.log('Connected successfully to DB!');
  }).catch((error) => {
    console.error(error);
  });
  /* eslint-disable no-console */
}

function initSchema() {
  const db = mongoose.connection;

  db.on('error', console.error('Connection not found!'));
  db.once('open', () => {
    // connected!
    const schema = new mongoose.Schema({
      name: String
    });

    const Model = mongoose.model('MyModel', schema);

    const example = new Model({ name: 'name1' });

    example.save((err, exam) => {
      if (err) console.error(err);
      else console.log(exam.name);
    });
  });
}

module.exports = {
  connect,
  initSchema
};
