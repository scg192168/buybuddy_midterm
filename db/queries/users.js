const db = require('../connection');

// ------------------------------------------------------------------------------------------------ GET Routes

/**
 * Get a all users from the database.
 * @return {Promise<{}>} A promise to the user.
 */
const getUsers = () => {
  return db.query('SELECT * FROM users;')
    .then(data => {
      return data.rows;
    });
};

// checking3


module.exports = {
  getUsers,
  addUser,
  getUserWithEmail,
  getUserWithId
};
