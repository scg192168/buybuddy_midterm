const express = require('express');
const router  = express.Router();
const productQueries = require('../db/queries/products');

// ------------------------------------------------------------------------------------------------ GET Routes

// List all products available
router.get("/", (req, res) => {
  productQueries
    .getAllProducts(req.query, 20)
    .then((products) => { //an array of products
      res.send({products})
      // res.render('urls_products_listing', { products })
    })
    .catch((e) => res.status(500).send("Error fetching products" ));
});

// Search for a product based on the parameters provided

// Get a single product


// ------------------------------------------------------------------------------------------------ GET Routes

// Add a product

// Delete a single product from database

// Mark a single product as sold


module.exports = router;
