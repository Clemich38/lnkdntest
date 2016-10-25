const knex = require('../db/connection');

module.exports = {

  // get all notes
  getAll(req, res) {
    // knex.select().table('notes')
    knex('notes').where('author_id', req.user.id).orderBy('id', 'desc')
      .then(function (notes) {
        res.json(notes);
      });
  },

  // add new note
  addNew(req, res) {
    // Insert users
    knex('notes').insert({
      title: req.body.title,
      text: req.body.text,
      revision: 1,
      author_id: req.user.id
    }).then(function (note) {
      res.json(note);
    });
  },

  // update single note
  updateSingle(req, res) {
    knex('notes')
      .where('id', req.params.id)
      .update({
        text: req.body.text
      })
      .then(
      knex('notes')
        .where('id', req.params.id)
        .increment('revision', 1)
        .then(function (note) {
          res.json(note);
        })
      );
  },

  // delete a single note
  deleteSingle(req, res) {
    knex('notes')
      .where('id', req.params.id)
      .del()
      .then(function (note) {
        res.json(note);
      });
  }
};