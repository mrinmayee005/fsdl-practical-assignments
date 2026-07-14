const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB connection (Compass)
mongoose.connect("mongodb://127.0.0.1:27017/feedbackDB")
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err));

// Schema and Model
const Feedback = mongoose.model("feedbacks", {
  name: String,
  feedback: String
});

// API to add feedback
app.post("/add", async (req, res) => {
  await Feedback.create(req.body);
  res.send("Feedback Stored");
});

// API to view feedback
app.get("/view", async (req, res) => {
  const data = await Feedback.find();
  res.json(data);
});

// Server start
app.listen(5000, () => {
  console.log("Server running on port 5000");
});
