const express = require('express');
const router  = express.Router();
const productQueries = require('../db/queries/products');

// Route to redirect to homepage
router.get("/", (req, res) => {
  // Check if the user is logged in
  const userIdFromSession  = req.session.userId;

  if (userIdFromSession ) {
    res.redirect('/users/login/buyer')
  } else {
    productQueries
    .getAllProducts(req.query, 20)
    .then((products) => { //an array of products
      res.render('homepage_beforelogin', { products })
    })
    .catch((e) => res.status(500).send("Error fetching products" ));
  }  
});

module.exports = router;