const mongoose = require('mongoose');

// Schema for Products (Clothing)
const itemSchema = new mongoose.Schema({
    name: String,
    price: Number,
    category: String,
    img: String
});

// Schema for Orders (Customer Purchases)
const orderSchema = new mongoose.Schema({
    items: Array,
    totalPrice: Number,
    orderDate: { type: Date, default: Date.now }
});

const Item = mongoose.model('Item', itemSchema);
const Order = mongoose.model('Order', orderSchema);

module.exports = { Item, Order };