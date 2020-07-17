const app = require('./app');
require('./dbconfig').connect();

const port = process.env.PORT || 5000;

app.listen(port, () => {
  /* eslint-disable no-console */
  console.log(`Listening http://localhost:${port}`);
  /* eslint-disable no-console */
});
