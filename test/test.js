const chai = require('chai');
const chaiHttp = require('chai-http');
http = require('http');
const app = require('../app');
const server = require('../backend-server/server');
const request = require('supertest');


chai.use(chaiHttp);
const expect = chai.expect;

// first check mocha
const assert = require('assert');
describe('Array', () => {
  describe('#indexOf()', () => {

    it('should return -1 when the value is not present', () => {
      assert.equal([1, 2, 3].indexOf(4), -1);
    });
  });
});

describe('server', function () {
  before(function () {
    server.listen(4000);
  });

  after(function () {
    server.close();
  });
});
describe('/', function () {

  it('fails, as expected', function (done) {
    chai.request(server)
      .get('/')
      .end(function (err, res) {
        expect(res).to.have.status(404);
        done();
      });
  });

  it('should return towns with 200 Ok', (done) => {
    chai
      .request(app)
      .get('/api/v1/towns')
      .end((err, res) => {
        expect(res).to.have.status(200);
        done();
      })

  });

});

