const request = require('supertest');
const expectedRecordResponse = require('./expected-record-response.json');

const app = require('../src/app');

describe('GET /api/v1', () => {
  it('responds with a json message', (done) => {
    request(app)
      .get('/api/v1')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200, {
        message: 'API: Merhaba!!'
      }, done);
  });
});

describe('POST /api/v1/record bad scenarios', () => {
  it('responds with invalid request body message for \'startDate\'', (done) => {
    request(app)
      .post('/api/v1/record')
      .send({
        startDate: "invalid-date-format",
        endDate: "2019-12-29",
        minCount: 2000,
        maxCount: 3000
      })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(500, {
        "code": -1,
        "msg": "startDate should be in date format"
      }, done)
  });

  it('responds with invalid request body message for \'endDate\'', (done) => {
    request(app)
      .post('/api/v1/record')
      .send({
        startDate: "2019-12-20",
        endDate: "invalid-date-format",
        minCount: 1000,
        maxCount: 3000
      })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(500, {
        "code": -1,
        "msg": "endDate should be in date format"
      }, done);
  });

  it('responds with invalid request body message for \'minCount\'', (done) => {
    request(app)
      .post('/api/v1/record')
      .send({
        startDate: "2019-12-20",
        endDate: "2019-12-28",
        minCount: "not-number",
        maxCount: 3000
      })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(500, {
        "code": -1,
        "msg": "minCount should be a number"
      }, done);
  });


  it('responds with invalid request body message for \'maxCount\'', (done) => {
    request(app)
      .post('/api/v1/record')
      .send({
        startDate: "2019-12-20",
        endDate: "2019-12-28",
        minCount: 1000,
        maxCount: "not-number"
      })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(500, {
        "code": -1,
        "msg": "maxCount should be a number"
      }, done);
  });

  it('responds with invalid request body message for \'startDate\' must be older than \'endDate\'', (done) => {
    request(app)
      .post('/api/v1/record')
      .send({
        "startDate": "2019-12-20",
        "endDate": "2019-12-10",
        "minCount": 500,
        "maxCount": 1000
      })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(500, {
        "code": -1,
        "msg": "startDate must be older than endDate"
      }, done);
  });

  it('responds with invalid request body message for \'minCount\' value greater than \'maxCount\'', (done) => {
    request(app)
      .post('/api/v1/record')
      .send({
        startDate: "2019-12-20",
        endDate: "2019-12-28",
        minCount: 1000,
        maxCount: 100
      })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(500, {
        "code": -1,
        "msg": "maxCount should be greater than minCount"
      }, done);
  });
});

// describe('POST /api/v1/record good scenarios', () => {
//   it('responds with filtered by given body records', (done) => {
//     request(app)
//       .post('/api/v1/record')
//       .send({
//         startDate: "2019-11-01",
//         endDate: "2019-12-25",
//         minCount: 2100,
//         maxCount: 3000
//       })
//       .expect('Accept', 'application/json')
//       .expect('Content-Type', /json/)
//       .expect(500, expectedRecordResponse, done)
//   });
// });