const express = require('express');
const router  = express.Router();
const wishlistQueries = require('../db/queries/wishlists');
const userQueries = require('../db/queries/users');

// Route to render user wishlist page
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

// Route user wishlist to be able to add items
router.post("/:id", (req, res) => {
  // Check if the user is logged in
  const userIdFromSession = req.session.userId;
  const productId = parseInt(req.body.productId);

  if (!userIdFromSession) {
    return res.status(403).send("😒😒😒😒You are not logged in!!! Log in to use the BuyBuddy....");
  }

  let wishlists;
  let userData;

  // Check if the product already exists in the wishlist
  wishlistQueries.checkProductInWishlist(userIdFromSession, productId)
    .then((productExistsInWishlist) => { // an object as the response
      // console.log(productExistsInWishlist, productId);
      if (productExistsInWishlist || productExistsInWishlist === productId) {
        // The product already exists in the wishlist, do nothing
        return res.redirect('/');
        // return res.status(403).send("😒😒😒😒Product already exist in the user wishlist...");
      }

      // The product doesn't exist in the wishlist, add it
      return wishlistQueries.AddItemToUserWishlists(userIdFromSession, productId);
    })
    .then(() => {
      // Get user data
      return userQueries.getUserWithId(userIdFromSession);
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

      // Get the updated wishlist
      return wishlistQueries.getUserWishlists(userData.id);
    })
    .then((wishlistFromUser) => {
      // Now you have both userData and messages data
      wishlists = wishlistFromUser;
      // const data = { user: userData, wishlists };
      res.render('wishlist', { user: userData, wishlists });
    })
    .catch((error) => {
      console.error("Database error:", error);
      res.status(500).send("Error fetching wishlist items");
    });
});


// Route to delete items from user wishlist
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

// Route to add items to user wishlist
// router.post("/add/:id", (req, res) => {
//   wishlistQueries
//     .AddItemToWishlists(req.params.id)
//     .then(() => { // An array of deleted items (possibly wishlists)
//       // Render the "wishlist" view and pass the deleted items as data
//       res.status(200).send('ok');
//     })
//     .catch((e) => {
//       // Handle errors by sending a 500 Internal Server Error response
//       res.status(500).send("Error fetching products");
//     });
// });


module.exports = router;