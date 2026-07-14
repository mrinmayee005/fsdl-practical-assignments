const mongoose = require("mongoose");

const packageSchema = new mongoose.Schema(
  {
    title: String,
    location: String,
    price: Number,
    description: String,
    image: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Package", packageSchema);
