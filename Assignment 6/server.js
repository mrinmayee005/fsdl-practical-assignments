const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const { Item, Order } = require('./models/Item'); // Note the { }

const app = express();

mongoose.connect('mongodb://127.0.0.1:27017/vogueLuxeDB')
    .then(() => console.log("✅ Connected to MongoDB"))
    .catch(err => console.error("❌ DB Connection Error:", err));

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.json()); // Essential for receiving order data

// 1. GET ROUTE: Show products
app.get('/', async (req, res) => {
    try {
        const products = await Item.find();
        res.render('index', { products });
    } catch (err) { res.status(500).send(err); }
});

// 2. POST ROUTE: Save order to MongoDB
app.post('/place-order', async (req, res) => {
    try {
        const newOrder = new Order({
            items: req.body.items,
            totalPrice: req.body.totalPrice
        });
        await newOrder.save();
        console.log("📦 New Order Saved to MongoDB!");
        res.status(200).json({ message: "Order Saved!" });
    } catch (err) {
        res.status(500).json({ error: "Failed to save order" });
    }
});

app.listen(3000, () => console.log("🚀 Server: http://localhost:3000"));