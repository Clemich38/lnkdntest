const express = require('express');
const router = express.Router();

const authHelpers = require('../auth/helperfunctions');
const notes = require('../controllers/notesController');


router.get('/user', authHelpers.pleaseLogin, (req, res, next) => {
  processResponse(res, 200, 'success');
});

// get all notes
router.get('/user/notes', notes.getAll);
// get single note
// router.get('/user/notes/:id', notes.getSingle);
// add new note
router.post('/user/notes', notes.addNew);
// update single note
router.put('/user/notes/:id', notes.updateSingle);
// delete a single note
router.delete('/user/notes/:id', notes.deleteSingle);


function processResponse(res, code, statusMsg) {
  res.status(code).json({ status: statusMsg });
}

module.exports = router;
