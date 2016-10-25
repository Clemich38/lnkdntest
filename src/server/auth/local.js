const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

// const init = require('./passport');
const knex = require('../db/connection');
const authHelperFunctions = require('./helperfunctions');

const options = {};

passport.use(new LocalStrategy(options, (username, password, done) => {
  // check to see if the username exists
  knex('users').where({ username }).first()
    .then((user) => {
      // Does usernam exist?
      if (!user) return done(null, false);
      // Does the password match?
      if (!authHelperFunctions.comparePass(password, user.password)) {
        return done(null, false);
      } else {
        return done(null, user);
      }
    })
    .catch((err) => { return done(err); });
}));

// Serialize user infos into the session cookie
passport.serializeUser((user, done) => {
  done(null, user.id);
});

// Deserialize user infos
passport.deserializeUser((id, done) => {
  knex('users').where({ id }).first()
    .then((user) => { done(null, user); })
    .catch((err) => { done(err, null); });
});

module.exports = passport;
