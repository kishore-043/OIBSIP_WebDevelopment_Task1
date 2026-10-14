const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

// Order Schema & Model
const orderSchema = new mongoose.Schema({
  customer: {
    name: String,
    phone: String,
    address: String
  },
  items: Array,
  totalAmount: Number,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Order = mongoose.model("Order", orderSchema);

// Existing Pizza Routes
const pizzaRoutes = require("./routes/pizzaRoutes");
app.use("/api/pizzas", pizzaRoutes);

// Orders Route
app.post("/api/orders", async (req, res) => {
  try {
    const newOrder = new Order(req.body);
    const savedOrder = await newOrder.save();
    console.log("Order saved to MongoDB:", savedOrder);
    res.status(201).json({ success: true, order: savedOrder });
  } catch (error) {
    console.error("Order save error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
});

app.get("/api-check", (req, res) => {
  res.send("API server is working");
});

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected successfully!");

    app.listen(process.env.PORT || 5000, () => {
      console.log(
        `Server running on http://localhost:${process.env.PORT || 5000}`
      );
    });
  })
  .catch((error) => {
    console.error("MongoDB connection failed:", error.message);
  });