const express = require("express");
const User = require("../models/User");
const Order = require("../models/Order");
const router = express.Router();

// GET /users
router.get("/", async (req, res, next) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (error) {
    next(error);
  }
});

// GET /users/:id
router.get("/:id", async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.id);
    res.json(user);
  } catch (error) {
    next(error);
  }
});

// GET /users/:id/orders
router.get("/:id/orders", async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.id, { include: Order });
    res.json(user);
  } catch (error) {
    next(error);
  }
});

// POST /users
router.post("/", async (req, res, next) => {
  try {
    const user = await User.create(req.body);
    res.json(user);
  } catch (error) {
    next(error);
  }
});

// PUT /users/:id
router.put("/:id", async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.id);
    await user.update(req.body);
    res.json(user);
  } catch (error) {
    next(error);
  }
});

// DELETE /users/:id
router.delete("/:id", async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.id);
    await user.destroy();
    res.json(user);
  } catch (error) {
    next(error);
  }
});
