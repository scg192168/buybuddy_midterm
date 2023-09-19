// routes/products.js
const express = require("express");
const router = express.Router();
const db = require("../db/queries/products"); // Import your database connection or queries module

router.get("/", (req, res) => {
  // Fetch products from your database (replace with actual code)
  const products = db.getProducts(); // Implement this function

  // Render the products template and pass the products data
  res.render("products", { products });
});

module.exports = router;
