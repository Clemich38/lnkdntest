const knex = require('../db/connection');

module.exports = {

  // get all notes
  getAll(req, res) {
    // knex.select().table('notes')
    knex('notes').where('author_id', req.user.id)
      .then(function (notes) {
        res.json(notes);
      });
  },

  // // get single note
  // getSingle(req, res) {
  //   Note.find({
  //     where: {
  //       id: req.params.id
  //     }
  //   }).then(function (notes) {
  //     res.json(notes);
  //   });
  // },

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

  // // update single note
  // updateSingle(req, res) {
  //   Note.find({
  //     where: {
  //       id: req.params.id
  //     }
  //   }).then(function (note) {
  //     if (note) {
  //       note.updateAttributes({
  //         title: req.body.title,
  //         text: req.body.text
  //       }).then(function (note) {
  //         res.send(note);
  //       });
  //     }
  //   });
  // },

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