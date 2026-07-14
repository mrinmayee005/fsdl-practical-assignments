const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect("mongodb://127.0.0.1:27017/feedbackDB")
.then(()=>console.log("MongoDB Connected"))
.catch(err=>console.log(err));

// Schema
const FeedbackSchema = new mongoose.Schema({
    name: String,
    message: String
});

const Feedback = mongoose.model("Feedback", FeedbackSchema);

// API: Add feedback
app.post("/add", async (req, res) => {
    const data = new Feedback(req.body);
    await data.save();
    res.send("Feedback Saved");
});

// API: Get all feedback
app.get("/all", async (req, res) => {
    const data = await Feedback.find();
    res.json(data);
});

app.listen(5000, () => console.log("Server running on port 5000"));