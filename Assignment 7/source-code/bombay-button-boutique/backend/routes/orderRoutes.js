const express = require("express");
const router = express.Router();
const Order = require("../models/Order");

// Place order
router.post("/add", async (req, res) => {
  const order = new Order(req.body);
  await order.save();
  res.send("Order Placed Successfully");
});

// Get all orders
router.get("/", async (req, res) => {
  const orders = await Order.find();
  res.json(orders);
});

module.exports = router;
