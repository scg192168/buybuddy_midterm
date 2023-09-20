/*
 * All routes for seller Data are defined here
 */

const express = require('express');
const router  = express.Router();
const userQueries = require('../db/queries/users');


// ------------------------------------------------------------------------------------------------ GET Routes

// View all products sold in main feeds

// Search product from database
    // filter by price
    // filter by product type
    // filter by seller

// View individual product details

// View buyer cart

// View buyer wishlist

// ------------------------------------------------------------------------------------------------ POST Routes

// Add products to Newlisting

// Add products to database

// Edit products details in the database

// Mark products as sold

module.exports = router;
