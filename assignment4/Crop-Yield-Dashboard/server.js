const express = require("express");
const mongoose = require("mongoose");
const app = express();

// Serve static files
app.use(express.static("public"));

// Connect to MongoDB (no extra options needed in Mongoose 7+)
mongoose.connect("mongodb://localhost:27017/agricultureDB");

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("MongoDB connected to agricultureDB");

  // Route to get data
  app.get("/data", async (req, res) => {
    try {
      const data = await db.collection("agriculture")
        .find({}, { projection: { _id: 0 } }) // exclude _id
        .toArray();
      res.json(data);
    } catch (err) {
      console.error(err);
      res.status(500).send("Error fetching data");
    }
  });

  // Start server
  app.listen(3000, () => console.log("Server running on port 3000"));
});
