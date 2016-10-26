process.env.NODE_ENV = 'test';

const chai = require('chai');
const should = chai.should();

const notesController = require('../../src/server/controllers/notesController');

describe('controllers : index', () => {

  describe('getAll()', () => {
    it('should return all the notes of 1 user', (done) => {
      notesController.getAll(1, 2, (err, total) => {
        should.not.exist(err);
        total.should.eql(3);
        done();
      });
    });
    
  });

});
