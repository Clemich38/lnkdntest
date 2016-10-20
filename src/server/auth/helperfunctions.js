const bcrypt = require('bcryptjs');

// Password verification (encrypted with bcrypt.js)
function comparePass(userPassword, databasePassword) {
  return bcrypt.compareSync(userPassword, databasePassword);
}

module.exports = {
  comparePass
};
