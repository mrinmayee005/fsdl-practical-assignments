const express = require("express");
const router = express.Router();
const Product = require("../models/Product");

// Add product
router.post("/add", async (req, res) => {
  const product = new Product(req.body);
  await product.save();
  res.send("Product Added");
});

// Get all products
router.get("/", async (req, res) => {
  const products = await Product.find();
  res.json(products);
});

module.exports = router;
