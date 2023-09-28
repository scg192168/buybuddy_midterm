const db = require('../connection');
const moment = require('moment');

const getUserWishlists = (userId) => {
  const queryString = `
  SELECT wishlists.id, wishlists.created_at, wishlists.userId, wishlists.productId,
         products.images AS product_images, products.price AS product_price, products.description AS product_description
  FROM wishlists
  JOIN products ON wishlists.productId = products.id
  JOIN users ON wishlists.userId = users.id
  WHERE wishlists.userId = $1;
`;
  
  const queryParams = [userId];
  return db
    .query(queryString, queryParams)
    .then((result) => { 
      const productFromWishList = result.rows;

      // console.log(productFromWishList);
      return Promise.resolve(productFromWishList);
    })
    .catch((error) => {
      console.error('Error querying database:', error.message);
      throw error;
    });
};

const getAllWishlists = () => {
  const queryString = `
  SELECT wishlists.id, wishlists.created_at, wishlists.userId, wishlists.productId,
         products.images AS product_images, products.price AS product_price, products.description AS product_description
  FROM wishlists
  JOIN products ON wishlists.productId = products.id;
`;
  return db.query(queryString)
    .then((result) => result.rows)
    .catch((error) => {
      console.error('Error querying database:', error.message);
      throw error;
    });
};

// Delete item from wishlist table
const DeleteItemFromWishlists = function(wishlistItemId) {
  const queryParams = [wishlistItemId];

  const queryString = `
  DELETE FROM wishlists
  WHERE id = $1;
`;
  return db
    .query(queryString, queryParams)
    .then(() => console.log('Item deleted successfully')) //
    .catch((err) => {
      console.error('Error inserting product:', err.message);
      throw err; // Rethrow the error to be handled elsewhere
    });
  
};

// Add item to wishlist table
const AddItemToUserWishlists = function (userId, productId) {
   // Get the current timestamp in the specified format
  const timestamp = moment().format('YYYY-MM-DD HH:mm:ssZ');
  
  const queryParams = [timestamp, userId, productId];

  const queryString = `INSERT INTO wishlists (created_at, userid, productid) 
  VALUES ($1, $2, $3) RETURNING *;
`;
  return db
    .query(queryString, queryParams)
    .then((response) => {
      productAdded = response.rows;
      
      return Promise.resolve(productAdded);
    })
    .catch((err) => {
      console.error('Error inserting product:', err.message);
      throw err; // Rethrow the error to be handled elsewhere
    });  
};

// Check if item already exist in wishlist table
const checkProductInWishlist = function (userId, productId) {
  const queryParams = [userId, productId];

  const queryString = `SELECT productid FROM wishlists WHERE userId = $1 and productId = $2;`;
  return db
    .query(queryString, queryParams)
    .then((response) => {
      if (response.rows.length > 0) {
        const productid = response.rows[0].productid;
        console.log('Product already exists:', productid);
        return Promise.resolve(productid);
      } else {
        console.log('Product does not exist in wishlist.');
        return Promise.resolve(null);
      }
    })
    .catch((err) => {
      console.error('Error inserting product:', err.message);
      throw err; // Rethrow the error to be handled elsewhere
    }); 
};

module.exports = {
  DeleteItemFromWishlists,
  AddItemToUserWishlists,
  getUserWishlists,
  checkProductInWishlist,
  getAllWishlists
};