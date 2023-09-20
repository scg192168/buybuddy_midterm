const express = require('express');
const router  = express.Router();
const productQueries = require('../db/queries/products');
router.get("/", (req, res) => {
  productQueries
    .getAllProducts(req.query, 20)
    .then((products) => { //an array of products
      console.log(products);
      res.render('wishlist', { products });
    })
    .catch((e) => res.status(500).send("Error fetching products"));
});

module.exports = router;
