/*
 * All routes for User Data are defined here
 */

const express = require('express');
const router  = express.Router();
const bcrypt = require("bcrypt");
const userQueries = require('../db/queries/users');


// ------------------------------------------------------------------------------------------------ GET Routes

// Return information about the current user (based on cookie value)
router.get("/:id", (req, res) => {
  const userId = req.session.userId;
  if (!userId) {
    return res.send({ message: "not logged in" });
  }

  database
    .getUserWithId(userId)
    .then((user) => {
      if (!user) {
        return res.send({ error: "no user with that id" });
      }

      res.send({
        user: {
          name: user.name,
          email: user.email,
          id: userId,
        },
      });
    })
    .catch((e) => res.send(e));
});

// ------------------------------------------------------------------------------------------------ POST Routes

// Register a new user
router.post("/new", (req, res) => {
  const user = req.body;
  user.password = bcrypt.hashSync(user.password, 12);
  database
    .addUser(user)
    .then((user) => {
      if (!user) {
        return res.send({ error: "error" });
      }

      req.session.userId = user.id;
      res.send({
        user: {
          name: user.username,
          email: user.email,
          id: user.id,
        },
      });
    })
    .catch((e) => res.send(e));
});

// Login a user as a buyer
router.post("/login/buyer", (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  userQueries.getUserWithEmail(email)
    .then((user) => {
      if (!user) {
        return res.send({ error: "no user with the email or password exist" });
      }
      if (!bcrypt.compareSync(password, user.password)) {
        return res.send({ error: "error" });
      }

      req.session.userId = user.id;
      res.send({
        user: {
          name: user.username,
          email: user.email,
          id: user.id,
        },
      });
  });  
});

// Login in a user as a seller
router.post("/login/seller", (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  userQueries.getUserWithEmail(email)
    .then((user) => {
      if (!user) {
        return res.send({ error: "no user with the email or password exist" });
      }

      if (user.role !== 'seller') {
        return res.send({ error: "Either the user you are trying to login with is not a valid seller or user does not exist" });
      }

      if (!bcrypt.compareSync(password, user.password)) {
        return res.send({ error: "error" });
      }

      req.session.userId = user.id;
      res.send({
        user: {
          name: user.username,
          email: user.email,
          id: user.id,
        },
      });
  });  
});

// Log a user out
router.post("/logout", (req, res) => {
  req.session.userId = null;
  res.send({});
});

module.exports = router;