process.env.NODE_ENV = 'test';

const chai = require('chai');
const should = chai.should();
const chaiHttp = require('chai-http');
chai.use(chaiHttp);

const server = require('../../src/server/app');
const knex = require('../../src/server/db/connection');

describe('routes : auth', () => {

  beforeEach(() => {
    return knex.migrate.rollback()
      .then(() => { return knex.migrate.latest(); })
      .then(() => { return knex.seed.run(); });
  });

  afterEach(() => {
    return knex.migrate.rollback();
  });

  // Resgister route test
  describe('POST /auth/register', () => {
    it('should register a new user', (done) => {
      chai.request(server)
        .post('/auth/register')
        .send({
          username: 'clement',
          password: 'clementpwd'
        })
        .end((err, res) => {
          should.not.exist(err);
          res.redirects.length.should.eql(0);
          res.status.should.eql(200);
          res.type.should.eql('application/json');
          res.body.status.should.eql('register successful!');
          done();
        });
    });
  });

  // Login route test
  describe('POST /auth/login', () => {

    it('should login a user', (done) => {
      chai.request(server)
        .post('/auth/login')
        .send({
          username: 'toto',
          password: 'totopwd'
        })
        .end((err, res) => {
          should.not.exist(err);
          res.redirects.length.should.eql(0);
          res.status.should.eql(200);
          res.type.should.eql('application/json');
          res.body.status.should.eql('login successful!');
          done();
        });
    });

    it('should not login an unregistered user', (done) => {
      chai.request(server)
        .post('/auth/login')
        .send({
          username: 'titi',
          password: 'totopwd'
        })
        .end((err, res) => {
          should.exist(err);
          res.redirects.length.should.eql(0);
          res.status.should.eql(404);
          res.type.should.eql('application/json');
          res.body.status.should.eql('Incorrect usernam or password');
          done();
        });
    });

    it('should not login if the pwd in incorrect', (done) => {
      chai.request(server)
        .post('/auth/login')
        .send({
          username: 'toto',
          password: 'badpwd'
        })
        .end((err, res) => {
          should.exist(err);
          res.redirects.length.should.eql(0);
          res.status.should.eql(404);
          res.type.should.eql('application/json');
          res.body.status.should.eql('Incorrect usernam or password');
          done();
        });
    });
  });

});
