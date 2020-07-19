const request = require('supertest');
const mockingoose = require('mockingoose').default;

const app = require('../src/app');

const expectedRecordResponse = require('./expected-record-response.json');
const testRecordData = require('./test-record-data.json');
const RecordModel = require('../src/model/record-model');

describe('POST /api/v1/record bad scenarios', () => {
  it('responds with invalid request body message for \'startDate\'', (done) => {
    request(app)
      .post('/api/v1/records')
      .send({
        startDate: "invalid-date-format",
        endDate: "2019-12-29",
        minCount: 2000,
        maxCount: 3000
      })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(400, {
        "code": -1,
        "msg": "startDate should be in date format"
      }, done)
  });

  it('responds with invalid request body message for \'endDate\'', (done) => {
    request(app)
      .post('/api/v1/records')
      .send({
        startDate: "2019-12-20",
        endDate: "invalid-date-format",
        minCount: 1000,
        maxCount: 3000
      })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(400, {
        "code": -1,
        "msg": "endDate should be in date format"
      }, done);
  });

  it('responds with invalid request body message for \'minCount\'', (done) => {
    request(app)
      .post('/api/v1/records')
      .send({
        startDate: "2019-12-20",
        endDate: "2019-12-28",
        minCount: "not-number",
        maxCount: 3000
      })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(400, {
        "code": -1,
        "msg": "minCount should be a number"
      }, done);
  });


  it('responds with invalid request body message for \'maxCount\'', (done) => {
    request(app)
      .post('/api/v1/records')
      .send({
        startDate: "2019-12-20",
        endDate: "2019-12-28",
        minCount: 1000,
        maxCount: "not-number"
      })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(400, {
        "code": -1,
        "msg": "maxCount should be a number"
      }, done);
  });

  it('responds with invalid request body message for \'startDate\' must be older than \'endDate\'', (done) => {
    request(app)
      .post('/api/v1/records')
      .send({
        "startDate": "2019-12-20",
        "endDate": "2019-12-10",
        "minCount": 500,
        "maxCount": 1000
      })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(400, {
        "code": -1,
        "msg": "startDate must be older than endDate"
      }, done);
  });

  it('responds with invalid request body message for \'minCount\' value greater than \'maxCount\'', (done) => {
    request(app)
      .post('/api/v1/records')
      .send({
        startDate: "2019-12-20",
        endDate: "2019-12-28",
        minCount: 1000,
        maxCount: 100
      })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(400, {
        "code": -1,
        "msg": "maxCount should be greater than minCount"
      }, done);
  });
});

describe('POST /api/v1/record happy scenarios', () => {
  mockingoose(RecordModel).toReturn(testRecordData, 'find');

  it('responds with filtered records by given body #1', (done) => {
    request(app)
      .post('/api/v1/records')
      .send({
        startDate: "2019-01-01",
        endDate: "2019-12-31",
        minCount: 2000,
        maxCount: 3000
      })
      .expect('Content-Type', /json/)
      .expect(200)
      .end(function (err, res) {
        if (err) {
          throw err;
        }
        expect(res.body.code).toEqual(0);
        expect(res.body.msg).toEqual('Success');
        expect(JSON.stringify(res.body)).toEqual(JSON.stringify(expectedRecordResponse));
        done();
      });
  });

  it('responds with filtered records by given body #2', (done) => {
    const expectedResponse = {
      code: 0,
      msg: 'Success',
      records: [
        {
          key: 'i3c2DhTA5ZB4hBLF',
          createdAt: '2019-12-04T21:00:00.000Z',
          totalCount: 2526
        }
      ]
    };

    request(app)
      .post('/api/v1/records')
      .send({
        startDate: "2019-11-01",
        endDate: "2019-12-25",
        minCount: 2500,
        maxCount: 3000
      })
      .expect('Content-Type', /json/)
      .expect(200)
      .end(function (err, res) {
        if (err) {
          throw err;
        }
        expect(res.body.code).toEqual(0);
        expect(res.body.msg).toEqual('Success')
        expect(JSON.stringify(res.body)).toEqual(JSON.stringify(expectedResponse));
        done();
      });
  });
});
