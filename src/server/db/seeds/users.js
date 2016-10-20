const bcrypt = require('bcryptjs');


exports.seed = (knex, Promise) => {
  // Delete existing entries
  return knex('users').del()
    .then(() => {
      const salt = bcrypt.genSaltSync();
      const hash = bcrypt.hashSync('totopwd', salt);
      return Promise.join(
        // Insert users
        knex('users').insert({
          username: 'toto',
          password: hash
        })
      );
    });
};
