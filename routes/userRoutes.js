/*
 * All routes for User Data are defined here
 */

const express = require('express');
const router = express.Router();
const bcrypt = require("bcrypt");
const userQueries = require('../db/queries/users');
const userSearchHelper = require('../userSearchHelper'); // Import the getUserWithEmail function


// GET Routes ------------------------------------------------------------------------------------------------ GET Routes

// Return information about the current user (based on cookie value)
router.get("/urls/buyer", (req, res) => {
  const idFromCookie = req.session.userId;

  if (!idFromCookie) { // return a relevant error message if id does not exist
    return res.status(403).send("😒😒😒😒You are not Logged in!!! Log in to use the TinyApp....");
  }


  userQueries
    .getUserWithId(idFromCookie)
    .then((user) => {
      const returnedUser = {
        usernname: user.username,
        email: user.email,
        role: user.role,
        id: user.id,
      };
      res.render("urls_buyer_index", returnedUser);
    })
    .catch((e) => res.status(500).send("No user with that id"));
});

// Return the login page
router.get("/login", (req, res) => {
  res.render('login');
});

// Return the signup page
router.get("/signup", (req, res) => {
  res.render("signup");
});

// Route to homepage
router.get("/urls_home", (req, res) => {
  res.render("urls_home");
});



// POST Routes ------------------------------------------------------------------------------------------------ POST Routes

// Register a new buyer user
router.post("/signup/buyer", (req, res) => {
  const user = req.body;
  const emailInput = user.email;
  const passwordInput = user.password;
  user.password = bcrypt.hashSync(passwordInput, 12);

  if (!emailInput || !passwordInput) { // if email or password is empty, request for them
    return res.status(400).send("Please enter an email and password");
  }

  // Check if the user with the same email already exists
  userSearchHelper.getUserWithEmail(emailInput)
    .then((userFound) => {
      if (userFound) {
        return res.status(400).send("User already exists");
      }

      userQueries
        .addUser(user)
        .then((user) => {
          req.session.userId = user.id;
          res.redirect('/users/urls/buyer');
        })
        .catch((e) => res.status(500).send("Error creating user"));
    })
    .catch((e) => res.status(500).send("Error checking user existence"));
});

// Register a new seller user
router.post("/signup/seller", (req, res) => {
  const user = req.body;
  const emailInput = user.email;
  const passwordInput = user.password;
  user.password = bcrypt.hashSync(passwordInput, 12);

  if (!emailInput || !passwordInput) { // if email or password is empty, request for them
    return res.status(400).send("Please enter an email and password");
  }

  // Check if the user with the same email already exists
  userSearchHelper.getUserWithEmail(emailInput)
    .then((userFound) => {
      if (userFound) {
        return res.status(400).send("User already exists");
      }

      userQueries
        .addUser(user)
        .then((user) => {
          req.session.userId = user.id;
          res.redirect('/urls/seller');
        })
        .catch((e) => res.status(500).send("Error creating user"));
    })
    .catch((e) => res.status(500).send("Error checking user existence"));
});

// Login a user as a buyer
router.post("/login/buyer", (req, res) => {
  const emailInput = req.body.email;
  const passwordInput = req.body.password;

  userQueries
    .getUserWithEmail(emailInput)
    .then((userFound) => {
      const hashedPassword = userFound.password; // Hash user password

      if (!userFound) {
        return res.status(403).send("😒😒😒😒User account does not exist. Please register a new user account");
      }

      if (userFound && !bcrypt.compareSync(passwordInput, hashedPassword)) {
        return res.status(403).send("😒😒😒😒Email or Password is incorrect!.... Please enter a valid email and password");
      }

      req.session.userId = userFound.id;
      res.redirect('/users/urls/buyer');
    });
});

// Login in a user as a seller
router.post("/login/seller", (req, res) => {
  const emailInput = req.body.email;
  const passwordInput = req.body.password;

  userQueries.getUserWithEmail(emailInput)
    .then((userFound) => {
      const hashedPassword = userFound.password; // Hash user password
      if (!userFound) {
        return res.send({ error: "no user with the email or password exist" });
      }

      if (userFound.role !== 'seller') {
        return res.send({ error: "Either the user you are trying to login with is not a valid seller or user does not exist" });
      }

      if (userFound && !bcrypt.compareSync(passwordInput, hashedPassword)) {
        return res.send({ error: "error" });
      }

      req.session.userId = userFound.id;
      res.redirect('/urls/seller');
    });
});

// Log a user out
router.post("/logout", (req, res) => {
  req.session.userId = null;
  res.redirect('/users/urls_home');
});


module.exports = router;
