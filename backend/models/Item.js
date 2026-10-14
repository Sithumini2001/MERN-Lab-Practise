const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },

  price: {
    type: Number,
    required: true
  },

  category: {
    type: String,
    required: true
  },

  // NEW FIELD
  quantity: {
    type: Number,
    required: true,
    min: 0
  }
});

module.exports = mongoose.model("Item", itemSchema);