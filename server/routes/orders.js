const express = require("express");
const { Order, Item } = require("../models");
const router = express.Router();

// GET /orders
router.get("/", async (req, res, next) => {
  try {
    const orders = await Order.findAll();
    res.json(orders);
  } catch (error) {
    next(error);
  }
});

// GET /orders/:id
router.get("/:id", async (req, res, next) => {
  try {
    const order = await Order.findByPk(req.params.id, { include: [Item] });
    res.json(order);
  } catch (error) {
    next(error);
  }
});

// POST /orders
router.post("/", async (req, res, next) => {
  try {
    const order = await Order.create(req.body);
    res.json(order);
  } catch (error) {
    next(error);
  }
});

// PUT /orders/:id
router.put("/:id", async (req, res, next) => {
  try {
    const order = await Order.findByPk(req.params.id);
    await order.update(req.body);
    res.json(order);
  } catch (error) {
    next(error);
  }
});

// DELETE /orders/:id
router.delete("/:id", async (req, res, next) => {
  try {
    const order = await Order.findByPk(req.params.id);
    await order.destroy();
    res.json(order);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
