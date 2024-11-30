const express = require("express");
const { Item, User } = require("../models/index");
const router = express.Router();

// GET /users
router.get("/", async (req, res, next) => {
  try {
    const users = await User.findAll();
    res.send(users);
  } catch (error) {
    next(error);
  }
});

// GET /users/:userId
router.get("/:id", async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.id, {
      include: [{ model: Item }],
    });

    if (!user) {
      res.status(404);
      next();
    } else {
      res.send(user);
    }
  } catch (error) {
    next(error);
  }
});

router.post("/login", async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const newUser = await User.create({ username, password });
    res.send(newUser);
  } catch (error) {
    next("error creating user: ", error);
  }
});

//add item to User (Add to Cart)
router.post("/:userId/addToCart/:itemId", async (req, res) => {
  try {
    const user = await User.findByPk(req.params.userId);
    const item = await Item.findByPk(req.params.itemId);
    if (user && item) {
      await user.addItem(item);
      res.status(200).json({ message: "Item added to cart successfully." });
    } else {
      res.status(404).json({ error: "User or item not found." });
    }
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while adding the item to the cart." });
  }
});

router.get("/:userId/items", async (req, res) => {
  try {
    const user = await User.findByPk(req.params.userId, {
      include: { model: Item, as: "Items" },
    });
    if (user) {
      console.log("User found:", user);
      console.log("User's items:", user.Items);
      res.json(user.Items);
    } else {
      res.status(404).json({ error: "User not found." });
    }
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while fetching the items." });
  }
});

module.exports = router;
