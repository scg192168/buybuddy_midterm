const db = require("../connection");

const getUsers = () => {
  return db.query("SELECT * FROM products;").then((data) => {
    return data.rows;
  });
};

module.exports = { getUsers };
