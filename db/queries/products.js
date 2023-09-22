const db = require('../connection');

// ------------------------------------------------------------------------------------------------ GET Routes

/**
 * Get all products from database
 * @param {{}} options An object containing product search options.
 * @param {*} limit The number of results to return.
 * @return {Promise<[{}]>}  A promise to the products.
 */
const getAllProducts = (options, limit) => {
  const queryParams = [];
  let queryString = `
    SELECT products.*
    FROM products
    JOIN users ON users.id = sellerid
  `;

  // Filter by title
  if (options.title) {
    queryParams.push(`%${options.title}%`);
    queryString += `  WHERE price LIKE $${queryParams.length} `;
  }

  // Filter by seller
  if (options.sellerid) {
    queryParams.push(options.sellerid);
    if (queryParams.length === 1) {
      queryString += `WHERE sellerid = $${queryParams.length} `;
    } else {
      queryString += `AND sellerid = $${queryParams.length} `;
    }
  }

  // Filter by price range (in dollars)
  if (options.minimum_price) {
    queryParams.push(options.minimum_price);
    if (queryParams.length === 1) {
      queryString += `WHERE product >= $${queryParams.length} `;
    } else {
      queryString += `AND product >= $${queryParams.length} `;
    }
  }

  if (options.maximum_price) {
    queryParams.push(options.maximum_price);
    if (queryParams.length === 1) {
      queryString += `WHERE price <= $${queryParams.length} `;
    } else {
      queryString += `AND price <= $${queryParams.length} `;
    }
  }

  // Add grouping
  queryString += `GROUP BY products.id `;

  // Apply limit to the query
  queryParams.push(limit);

  // Add grouping, ordering, and limit
  queryString += `
    ORDER BY price
    LIMIT $${queryParams.length};
  `;

  // console.log(queryString, queryParams);

  return db
    .query(queryString, queryParams)
    .then((result) => {
      console.log(result.rows);
      return Promise.resolve(result.rows)
    }) // Return the rows
    .catch((err) => {
      console.error('Error querying database:', err.message);
      throw err; // Rethrow the error to be handled elsewhere
    });
};

/**
 * Get a single product from the database given their title.
 * @param {String} title The title of the product.
 * @return {Promise<{}>} A promise to the user.
 */
const getProductWithTitle = function(title) {
  return db
    .query(`SELECT * FROM users WHERE email ilike $1`, [title])
    .then((result) => {
      let resolvedProduct = null;
      const product = result.rows[0];
      if (product && product.title.toLowerCase() === title.toLowerCase()) {
        resolvedProduct = product;
      }
      return Promise.resolve(resolvedTitle);
    })
    .catch((err) => {
      console.error('Error querying database:', err.message);
      throw err; // Rethrow the error to be handled elsewhere
    });
};

/**
 * Get a single product from the database given their id.
 * @param {string} id The id of the product.
 * @return {Promise<{}>} A promise to the user.
 */
const getProductWithId = function(id) {
  return db
    .query(`SELECT * FROM products WHERE id = $1`, [id])
    .then((result) => {
      let resolvedProduct = null;
      const product = result.rows[0];
      if (product && product.id === id) {
        resolvedProduct = product;
      }
      return Promise.resolve(resolvedProduct);
    })
    .catch((err) => {
      console.error('Error querying database:', err.message);
      throw err; // Rethrow the error to be handled elsewhere
    });
};

// ------------------------------------------------------------------------------------------------ POST Routes

/**
 * Add a new product to the products table.
 * @param {Object} product The product object to be added.
 * @return {Promise<[{}]>} A promise to the saved version of the product.
 */
const addProductToDatabase = function(product) {
  // Define the query parameters and query values
  const queryParams = [];
  const queryValues = [];

  // Convert string values to integers where needed
  product.sellerid = parseInt(product.sellerid, 10);
  product.price = parseInt(product.price, 10);

  // Construct the query string dynamically based on the provided product object
  let queryString = `
    INSERT INTO products (
      sellerid,
      title,
      description,
      price,
      category
      images,
      status
    ) VALUES (
  `;

  // Define an array of column names that correspond to the products in the object
  const columnNames = [
    'sellerid',
    'title',
    'description',
    'price',
    'category',
    'images',
    'status'
  ];

  // Loop through the column names and add the corresponding values to queryParams
  for (const columnName of columnNames) {
    queryParams.push(product[columnName]);
    queryValues.push(`$${queryParams.length}`);
  }

  queryString += queryValues.join(', '); // Join the values with commas
  queryString += `) RETURNING *;`; // Add RETURNING * to return the saved product

  // Execute the query and return the saved product
  return db
    .query(queryString, queryParams)
    .then((result) => console.log(result.rows[0])) // Return the first row (saved product)
    .catch((err) => {
      console.error('Error inserting product:', err.message);
      throw err; // Rethrow the error to be handled elsewhere
    });
};

/**
 * Delete a product from the database.
 * @param {String} productId The product id to be removed from the database.
 * @param {String} sellerId The seller id the is removing the product from the database.
 * @return {Promise<[{}]>} A promise to the saved version of the product.
 */
const deleteProductFromDatabase = function (productId, sellerId) {

  // Convert string values to integers where needed
  productId = parseInt(productId, 10);
  sellerId = parseInt(sellerId, 10);
  const queryParams = [productId, sellerId];

  const queryString = `
  DELETE FROM products
  WHERE product.id = $1
  AND sellerid = $2
`;
  return db
    .query(queryString, queryParams)
    .then((result) => console.log(result.rows[0])) // Return the first row (saved product)
    .catch((err) => {
      console.error('Error inserting product:', err.message);
      throw err; // Rethrow the error to be handled elsewhere
    });
}

/**
 * Mark a product as sold in the database.
 * @param {String} productId The product id to be removed from the database.
 * @param {String} sellerId The seller id the is removing the product from the database.
 * @return {Promise<[{}]>} A promise to the saved version of the product.
 */
const markProductsAsSold = function (productId, sellerId) {

  // Convert string values to integers where needed
  productId = parseInt(productId, 10);
  sellerId = parseInt(sellerId, 10);
  const queryParams = ['sold', productId, sellerId];

  const queryString = `
  UPDATE products
  SET status = $1
  WHERE product.id = $2
  AND sellerid = $3
`;
  return db
    .query(queryString, queryParams)
    .then((result) => console.log(result.rows[0])) // Return the first row (saved product)
    .catch((err) => {
      console.error('Error inserting product:', err.message);
      throw err; // Rethrow the error to be handled elsewhere
    });
};

module.exports = {
  getAllProducts,
  addProductToDatabase,
  getProductWithTitle,
  getProductWithId,
  deleteProductFromDatabase,
  markProductsAsSold
};
