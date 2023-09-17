/*
 * All routes for buyer Data are defined here
 */

const express = require('express');
const router  = express.Router();
const userQueries = require('../db/queries/users');
const connection = require('/connection');

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

// Create a wishlist

// Add products to wishlist

// Remove products from wishlist

// Add products to buyer cart

// Remove products from buyer cart

module.exports = router;
