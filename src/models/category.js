const mongoose = require("mongoose");


const categorySchema = new mongoose.Schema({
  genre: {
    type: String,
    trim: true,
    required: [true, "genre is required"]
  }
})

module.exports = mongoose.model("Category", categorySchema);