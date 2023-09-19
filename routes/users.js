/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into /users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

// const express = require('express');
// const router  = express.Router();

// router.get('/', (req, res) => {
//   res.render('users');
// });

// module.exports = router;

const express = require("express");
const router = express.Router();
const userQueries = require("../db/queries/users");

// Route to render the registration form
router.get("/register", (req, res) => {
  res.render("registration"); // Render your registration form (registration.ejs)
});

// Route to render the login form
router.get("/login", (req, res) => {
  res.render("login"); // Render your login form (login.ejs)
});

module.exports = router;
