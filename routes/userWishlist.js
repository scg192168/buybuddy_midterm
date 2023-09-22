const express = require('express');
const router  = express.Router();
const wishlistQueries = require('../db/queries/wishlists');

router.get("/", (req, res) => {
  wishlistQueries
    .getAllWishlists()
    .then((wishlists) => {
      // Render the "wishlist" view and pass the retrieved wishlists as data
      res.render('wishlist', { wishlists });
    })
    .catch((e) => {
      // Handle errors by sending a 500 Internal Server Error response
      res.status(500).send("Error fetching wishlist items");
    });
});

router.post("/delete/:id", (req, res) => {
  wishlistQueries
    .DeleteItemFromWishlists(req.params.id)
    .then(() => { // An array of deleted items (possibly wishlists)
      // Render the "wishlist" view and pass the deleted items as data
      res.status(200).send('ok');
    })
    .catch((e) => {
      // Handle errors by sending a 500 Internal Server Error response
      res.status(500).send("Error fetching products");
    });
});


module.exports = router;