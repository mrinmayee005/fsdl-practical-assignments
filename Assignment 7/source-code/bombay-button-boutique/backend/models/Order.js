const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  customerName: String,
  address: String,
  products: Array,
  totalAmount: Number,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Order", orderSchema);
