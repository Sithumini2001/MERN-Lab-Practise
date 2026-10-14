const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const Item = require("./models/Item");
require("dotenv").config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB Connected Successfully!");
  })
  .catch((error) => {
    console.log("MongoDB Connection Error:", error.message);
  });


// Test Route
app.get("/", (req, res) => {
  res.send("Backend Server is Running!");
});

// GET All Items
app.get("/api/items", async (req, res) => {
  try {
    const items = await Item.find();
    res.json(items);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST - Add New Item
app.post("/api/items", async (req, res) => {
  try {
    const { name, price, category, quantity } = req.body;

    const newItem = new Item({
      name,
      price,
      category,
      quantity
    });

    const savedItem = await newItem.save();

    res.status(201).json(savedItem);

  } catch (error) {
    res.status(400).json({
      message: error.message
    });
  }
});

// Server Port
const PORT = process.env.PORT || 5000;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});