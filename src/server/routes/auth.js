const express = require('express');
const router = express.Router();

const authHelpers = require('../auth/helperfunctions');
const passport = require('../auth/local');

// New user creation route
router.post('/register', (req, res, next) => {
  return authHelpers.createUser(req, res)
    .then((user) => { processLogin(res, user[0]); })
    .then(() => { processResponse(res, 200, 'register successful!'); })
    .catch((err) => { processResponse(res, 500, 'register failed'); });
});

// Login route
router.post('/login', (req, res, next) => {
  passport.authenticate('local', function(err, user, info) {
    if (err) { processResponse(res, 500, 'login error'); }
    else if (!user) { processResponse(res, 404, 'Incorrect usernam or password'); }
    if (user) { processResponse(res, 200, 'login successful!'); }
  })(req, res, next);
});

// Logout route
router.get('/logout', authHelpers.pleaseLogin, (req, res, next) => {
  req.logout();
  processResponse(res, 200, 'logout successful!');
});



// ----------------
// Helper functions
// ----------------

function processLogin(req, user) {
  return new Promise((resolve, reject) => {
    req.login(user, (err) => {
      if (err) reject(err);
      resolve();
    });
  });
}

function processResponse(res, code, statusMsg) {
  res.status(code).json({ status: statusMsg });
}

module.exports = router;
