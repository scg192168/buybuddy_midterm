const db = require('../connection');

// ------------------------------------------------------------------------------------------------ GET Routes

/**
 * Get a all users from the database.
 * @return {Promise<{}>} A promise to the user.
 */
const getUsers = () => {
  return db.query('SELECT * FROM users;')
    .then(result => {
      let resolvedUsers = null;
      const users = result.rows;
      if (users) {
        resolvedUsers = users;
      }
      return Promise.resolve(resolvedUsers);
    });
};

/**
 * Get a single user from the database given their email.
 * @param {String} email The email of the user.
 * @return {Promise<{}>} A promise to the user.
 */
const getUserWithEmail = function(email) {
  return db
    .query(`SELECT * FROM users WHERE email like $1`, [email])
    .then((result) => {
      let resolvedUser = null;
      const user = result.rows[0];
      if (user && user.email.toLowerCase() === email.toLowerCase()) {
        resolvedUser = user;
      }
      return Promise.resolve(resolvedUser);
    })
    .catch((err) => {
      console.error('Error querying database:', err.message);
      throw err; // Rethrow the error to be handled elsewhere
    });
};

/**
 * Get a single user from the database given their id.
 * @param {string} id The id of the user.
 * @return {Promise<{}>} A promise to the user.
 */
const getUserWithId = function(id) {
  return db
    .query(`SELECT * FROM users WHERE id = $1`, [id])
    .then((result) => {
      let resolvedUser = null;
      const user = result.rows[0];
      if (user && user.id === id) {
        resolvedUser = user;
      }
      return Promise.resolve(resolvedUser);
    })
    .catch((err) => {
      console.error('Error querying database:', err.message);
      throw err; // Rethrow the error to be handled elsewhere
    });
};

// ------------------------------------------------------------------------------------------------ POST Routes

/**
 * Add a new user to the database.
 * @param {{name: string, password: string, email: string}} user
 * @return {Promise<{}>} A promise to the user.
 */
const addUser = function(user) {
  return db
    .query(`INSERT INTO users (username, email, password, role) 
    VALUES ($1, $2, $3, $4) RETURNING *;`, [user.username, user.email, user.password, user.role])
    .then((result) => {
      const newUserAdded = result.rows[0];
      return Promise.resolve(newUserAdded);
    })
    .catch((err) => {
      console.error('Error adding user:', err.message);
      throw err; // Rethrow the error to be handled elsewhere
    });
};

// checking3


module.exports = {
  getUsers,
  addUser,
  getUserWithEmail,
  getUserWithId
};
