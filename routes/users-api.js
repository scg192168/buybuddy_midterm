/*
 * All routes for User Data are defined here
 * Since this file is loaded in server.js into api/users,
 *   these routes are mounted onto /api/users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();
const userQueries = require('../db/queries/users');

// Authentication Middleware
const isAuthenticated = (req, res, next) => {
  // Check if the user is authenticated, e.g., using Passport.js
  if (req.isAuthenticated()) {
    // If authenticated, proceed to the route handler
    return next();
  }
  // If not authenticated, send an unauthorized response
  res.status(401).json({ error: 'Unauthorized' });
};

router.get('/', isAuthenticated, (req, res) => {
  userQueries.getUsers()
    .then(users => {
      res.json({ users });
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
});

module.exports = router;
