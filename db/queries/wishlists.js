const db = require('../connection');

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

// Convert string values to integers where needed
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

module.exports = {
  DeleteItemFromWishlists,
  getAllWishlists
};
