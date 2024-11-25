const express = require("express");
const router = express.Router();
const { Item } = require("../models");

// GET /items
router.get("/", async (req, res, next) => {
  try {
    const Items = await Item.findAll();
    res.send(Items);
  } catch (error) {
    next(error);
  }
});

module.exports = router;