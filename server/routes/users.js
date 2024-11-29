const express = require("express");
const { Order, User, Item } = require("../models");
const { check, validationResult } = require("express-validator");
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
    const user = await User.findByPk(req.params.id, {
      include: [Order],
    });
    res.json(user);
  } catch (error) {
    next(error);
  }
});

// POST /users
router.post(
  "/",
  [
    check("name").notEmpty().trim(),
    check("email").notEmpty().isEmail().trim(),
    check("password").notEmpty().isStrongPassword(),
    check("cart").isArray(),
    check("isAdmin").notEmpty().isBoolean(),
  ],
  async (req, res, next) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      } else {
        const user = await User.create(req.body);
        res.json(user);
      }
    } catch (error) {
      next(error);
    }
  }
);

// PUT /users/:id
router.put(
  "/:id",
  [
    check("name").notEmpty().trim(),
    check("email").notEmpty().isEmail().trim(),
    check("password").notEmpty().isStrongPassword(),
    check("cart").isArray(),
    check("isAdmin").notEmpty().isBoolean(),
  ],
  async (req, res, next) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      } else {
        const user = await User.findByPk(req.params.id);
        await user.update(req.body);
        res.json(user);
      }
    } catch (error) {
      next(error);
    }
  }
);

// PUT /users/:id/addToCart
router.put("/:id/addToCart/:itemId", async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.id);
    const item = await Item.findByPk(req.params.itemId);
    await user.update({
      cart: [...user.cart, item],
    });
    res.json(user);
  } catch (error) {
    next(error);
  }
});

// PUT /users/:id/updateCart
router.put("/:id/updateCart", async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.id);
    await user.update({
      cart: req.body,
    });
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

module.exports = router;
