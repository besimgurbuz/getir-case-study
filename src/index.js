const app = require('./app');
const { connect, initSchema } = require('./dbconfig');

const port = process.env.PORT || 5000;

connect();
initSchema();

app.listen(port, () => {
  /* eslint-disable no-console */
  console.log(`Listening http://localhost:${port}`);
  /* eslint-disable no-console */
});
