const express = require('express');
const router = express.Router();

const authHelpers = require('../auth/helperfunctions');
const passport = require('../auth/local');

// New user creation route
router.post('/register', (req, res, next) => {
  return authHelpers.createUser(req, res)
    .then((user) => { handleLogin(res, user[0]); })
    .then(() => { handleResponse(res, 200, 'register successful!'); })
    .catch((err) => { handleResponse(res, 500, 'register failed'); });
});

// Login route
router.post('/login', (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) { handleResponse(res, 500, 'login error'); }
    if (!user) { handleResponse(res, 404, 'User not found'); }
    if (user) { handleResponse(res, 200, 'login successful!'); }
  })(req, res, next);
});



// ----------------
// Helper functions
// ----------------

function handleLogin(req, user) {
  return new Promise((resolve, reject) => {
    req.login(user, (err) => {
      if (err) reject(err);
      resolve();
    });
  });
}

function handleResponse(res, code, statusMsg) {
  res.status(code).json({ status: statusMsg });
}

module.exports = router;
