const passport = require('passport');
const knex = require('../db/connection');

module.exports = () => {

  // Serialize user infos into the session cookie
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  // Deserialize user infos
  passport.deserializeUser((id, done) => {
    knex('users').where({id}).first()
    .then((user) => { done(null, user); })
    .catch((err) => { done(err,null); });
  });

};
