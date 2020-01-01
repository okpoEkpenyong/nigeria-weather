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

before(async () => {
  await pool.query(`CREATE TABLE towns ( 
    tID SERIAL PRIMARY KEY ,
    town_name VARCHAR(255) NOT NULL ,
    state VARCHAR (255)NOT NULL ,
    region VARCHAR (255) NOT NULL
  )`);
});

beforeEach( async () => {
  await pool.query("INSERT INTO towns (town_name,state,region) VALUES ('Gboko','Benue','North Central')");
});

afterEach(async () => {
  await pool.query("DELETE FROM towns");
});

after(async () => {
  await pool.query("DROP TABLE towns");
  pool.end();
});
describe("GET /api/v1/auth/towns", () => {
 it(" responds with an array of towns data", async () => {
    const Towns = await request(app)
    .get("/api/v1/auth/towns");
   // console.log('towns:', Towns.body.data[0].tid )
    expect(Towns.body.data[0]).to.have.property("tid");
    expect(Towns.body.data[0]).to.have.property("state");
    expect(Towns.body.data[0]).to.have.property("region");
    expect(Towns).to.have.status(200);
    expect(Towns.body.data[0]).to.include({
    tid:  Towns.body.data[0].tid,
    town_name: 'Gboko' ,
    state: 'Benue',
    region: 'North Central'
   })
  });

  it("should not fetch validTown with incorrect url", async () => {
    const invalidTown = await request(app)
    .get('/api/v1/auth/toe')
    expect(invalidTown).to.have.status(404);
  })
});

describe("GET /api/v1/auth/town", () => {
  it(" responds with an array of town names only", async () => {
     const Towns = await request(app)
     .get("/api/v1/auth/town");
     console.log('towns:', Towns.body.data[0] )
     expect(Towns.body.data[0]).to.have.property("town_name");
     expect(Towns).to.have.status(200);
     expect(Towns.body.data[0]).to.include({
     town_name: 'Gboko' ,
    })
   });
 
   it("should not fetch validTown with incorrect url", async () => {
     const invalidTown = await request(app)
     .get('/api/v1/auth/toe')
     expect(invalidTown).to.have.status(404);
   })
 });

describe("POST /api/v1/auth/create-town/", () => {
  it("It responds with the newly created town", async () => {
    const newTown = await request(app)
      .post("/api/v1/auth/create-town")
      .send({
        town_name: 'Aba' ,
        state: 'Abia',
        region: 'South East'
      });
      expect(newTown.body.data[0]).to.include({
        tid:  newTown.body.data[0].tid,
        town_name: 'Aba' ,
        state: 'Abia',
        region: 'South East'
       })
    expect(newTown).to.have.status(201);

    const response = await request(app)
    .get("/api/v1/auth/towns");
    expect(response.body.data.length).to.equal(2);
  });
});

describe("DELETE /api/v1/auth/towns/:town_name", () => {
  it("It responds with a message of Deleted", async () => {
    const newTown = await request(app)
      .post("/api/v1/auth/create-town/")
      .send({
        town_name: 'Agbor' ,
        state: 'Delta',
        region: 'South South'
      });
    const removedTown = await request(app)
    .delete(`/api/v1/auth/towns/${newTown.body.data[0].town_name}`);
    console.log('new:',newTown.body.data[0].town_name )
    console.log('removed:',removedTown.body )
    expect(removedTown.body).to.include({ message: `${newTown.body.data[0].town_name} town successfully deleted!` });
    expect(removedTown).to.have.status(200);

    const response = await request(app)
    .get("/api/v1/auth/towns");
    expect(response.body.data.length).to.equal(1);
  });
});

