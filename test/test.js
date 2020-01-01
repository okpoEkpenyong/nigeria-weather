const chai = require('chai');
const chaiHttp = require('chai-http');
http = require('http');
const app = require('../app');
const server = require('../backend-server/server');
const request = require('supertest');
const { pool } = require("../config");



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



