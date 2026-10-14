const express = require("express");
const Pizza = require("../models/Pizza");

const router = express.Router();

// GET all pizzas
router.get("/", async (req, res) => {
  try {
    const pizzas = await Pizza.find();
    res.json(pizzas);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

// POST new pizza
router.post("/", async (req, res) => {
  try {
    const pizza = new Pizza({
      name: req.body.name,
      price: req.body.price,
    });

    const savedPizza = await pizza.save();
    res.status(201).json(savedPizza);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

module.exports = router;