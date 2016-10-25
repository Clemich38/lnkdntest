const express = require('express');
var path = require('path');
const router = express.Router();


// GET home page
router.get('/', (req, res, next) => {
  res.sendFile(path.join(
    __dirname, '..', '..', 'client', 'index.html'));
});

module.exports = router;
