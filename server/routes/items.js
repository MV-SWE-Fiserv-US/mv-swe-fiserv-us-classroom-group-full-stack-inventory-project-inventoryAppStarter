const express = require("express");
const router = express.Router();
const { Item } = require("../models");

// GET /items
router.get("/", async (req, res, next) => {
  try {
    const Items = await Item.findAll();
    res.status(200).json(Items);
  } catch (error) {
    next(error);
  }
});

router.get("/:id", async (req, res, next) => {
    try {
        const targetItem = await Item.findByPk(req.params.id);
        res.status(200).json(targetItem);
    } catch(error) {
        next(error);
    }
})

module.exports = router;