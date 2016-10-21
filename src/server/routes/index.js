const express = require('express');
var path = require('path');
const router = express.Router();

// const indexController = require('../controllers/index');

// GET home page
router.get('/', (req, res, next) => {
  res.sendFile(path.join(
    __dirname, '..', '..', 'client', 'views', 'index.html'));
});

// router.get('/', function (req, res, next) {
//   const renderObject = {};
//   renderObject.title = 'Welcome to Express!';
//   indexController.sum(1, 2, (error, results) => {
//     if (error) return next(error);
//     if (results) {
//       renderObject.sum = results;
//       res.render('index', renderObject);
//     }
//   });
// });

module.exports = router;
