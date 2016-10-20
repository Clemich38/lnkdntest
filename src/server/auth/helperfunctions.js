const knex = require('../db/connection');
const bcrypt = require('bcryptjs');

// Password verification (encrypted with bcrypt.js)
function comparePass(userPassword, databasePassword) {
  return bcrypt.compareSync(userPassword, databasePassword);
}

// Create a new user
function createUser(req) {
  const salt = bcrypt.genSaltSync();
  const hash = bcrypt.hashSync(req.body.password, salt);
  return knex('users')
    .insert({
      username: req.body.username,
      password: hash
    })
    .returning('*');
}

module.exports = {
  comparePass,
  createUser
};

