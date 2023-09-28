const express = require('express');
const router  = express.Router();
const productQueries = require('../db/queries/products');
const userQueries = require('../db/queries/users');

// ------------------------------------------------------------------------------------------------ GET Routes

// Route to list all products available
router.get("/", (req, res) => {
  const idFromCookie = req.session.userId;

  if (idFromCookie) {
    res.redirect('/products/listing');
  }
  productQueries
    .getAllProducts(req.query, 20)
    .then((products) => { //an array of products
      res.render('urls_products_listing', { products })
    })
    .catch((e) => res.status(500).send("Error fetching products" ));
});

// Search for a product based on the parameters provided

// Get a single product

// Route to get specific product details
router.get('/details/:id', (req, res) => {
  const productId = parseInt(req.params.id);
  const idFromCookie = req.session.userId;

  if (!idFromCookie) {
    return res.status(403).send("😒😒😒😒You are not logged in!!! Log in to use the BuyBuddy....");
  }

  // Fetch user data and products data using Promises with .then()
  let userData;

  userQueries.getUserWithId(idFromCookie)
    .then((user) => {
      if (!user) {
        return res.status(404).send("No user with that ID");
      }

      userData = {
        username: user.username,
        email: user.email,
        role: user.role,
        id: user.id,
      };

      return productQueries.getProductWithId(productId);
    })
    .then((product) => { 
      // Now you have both userData and products data
      const data = { user: userData, product: product };
      res.render('product_details', data)
    })
    .catch((e) => res.status(500).send("Error fetching products" ));
});

// Route to get user products
router.get('/listing', (req, res) => {
  const idFromCookie = req.session.userId;

  if (!idFromCookie) {
    return res.status(403).send("😒😒😒😒You are not logged in!!! Log in to use the BuyBuddy....");
  }

  // Fetch user data and products data using Promises with .then()
  let userData;

  userQueries.getUserWithId(idFromCookie)
    .then((user) => {
      if (!user) {
        return res.status(404).send("No user with that ID");
      }

      userData = {
        username: user.username,
        email: user.email,
        role: user.role,
        id: user.id,
      };

      return productQueries.getAllProducts(req.query, 20)
    })
    .then((products) => { 
      // Now you have both userData and products data
      const data = { user: userData, products: products };
      res.render('urls_buyer_index', data)
    })
    .catch((e) => res.status(500).send("Error fetching products" ));
});


// ------------------------------------------------------------------------------------------------ GET Routes

// Add a product

// Delete a single product from database

// Mark a single product as sold

// Route to redirect to product details
router.post('/details', (req, res) => {
  res.redirect('/products/details')
});

//contact seller

// Route to modifiy specific product details
router.post('/details/:id', (req, res) => {
  const productId = parseInt(req.params.id);
  const idFromCookie = req.session.userId;

  if (!idFromCookie) {
    return res.status(403).send("😒😒😒😒You are not logged in!!! Log in to use the BuyBuddy....");
  }

  // Fetch user data and products data using Promises with .then()
  let userData;

  userQueries.getUserWithId(idFromCookie)
    .then((user) => {
      if (!user) {
        return res.status(404).send("No user with that ID");
      }

      userData = {
        username: user.username,
        email: user.email,
        role: user.role,
        id: user.id,
      };

      return productQueries.getProductWithId(productId);
    })
    .then((product) => { 
      // Now you have both userData and products data
      const data = { user: userData, product: product };
      res.render('product_details', data)
    })
    .catch((e) => res.status(500).send("Error fetching products" ));
});


module.exports = router;