const express = require('express');
const router = express.Router();

const authHelpers = require('../auth/helperfunctions');

router.get('/user', authHelpers.pleaseLogin, (req, res, next) => {
  processResponse(res, 200, 'success');
});

function processResponse(res, code, statusMsg) {
  res.status(code).json({ status: statusMsg });
}

module.exports = router;
