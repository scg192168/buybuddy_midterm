const express = require('express');
const router  = express.Router();
const wishlistQueries = require('../db/queries/wishlists');
const userQueries = require('../db/queries/users');

router.get("/", (req, res) => {
  // Check if the user is logged in
  const userIdFromSession  = req.session.userId;


  if (!userIdFromSession ) {
    return res.status(403).send("😒😒😒😒You are not logged in!!! Log in to use the BuyBuddy....");
  }
 
  let wishlists;
  let userData;
  
  return userQueries.getUserWithId(userIdFromSession)
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
      
      return wishlistQueries.getUserWishlists(userData.id)
    })
    .then((wishlistFromUser) => {
      // Now you have both userData and messages data
      wishlists = wishlistFromUser;
      const data = { user: userData, wishlists };
      console.log(data);
      res.render('wishlist', { user: userData, wishlists })
    })
    .catch ((error) => {
      console.error("Database error:", error);
      res.status(500).send("Error fetching wishlist items");
    })
   
})

router.post("/:id", (req, res) => {
  // Check if the user is logged in
  const userIdFromSession  = req.session.userId;
  const productId = parseInt(req.body.productId);


  if (!userIdFromSession ) {
    return res.status(403).send("😒😒😒😒You are not logged in!!! Log in to use the BuyBuddy....");
  }
 
  let wishlists;
  let userData;


 
  wishlistQueries.AddItemToUserWishlists(userIdFromSession, productId)
    .then((productAddedToWishList) => {
 
      // wishlists = productAddedToWishList;
 
      return userQueries.getUserWithId(userIdFromSession)
    })
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
      
      return wishlistQueries.getUserWishlists(userData.id)
    })
    .then((wishlistFromUser) => {
      // Now you have both userData and messages data
      wishlists = wishlistFromUser;
      // const data = { user: userData, wishlists };
      res.render('wishlist', { user: userData, wishlists })
    })
    .catch ((error) => {
      console.error("Database error:", error);
      res.status(500).send("Error fetching wishlist items");
    }) 
  
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

router.post("/add/:id", (req, res) => {
  wishlistQueries
    .AddItemToWishlists(req.params.id)
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