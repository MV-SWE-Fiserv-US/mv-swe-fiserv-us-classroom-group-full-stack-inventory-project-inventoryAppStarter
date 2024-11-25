const express = require("express")
const router = express.Router()
const { Item } = require("../models")

// GET /items
router.get("/", async (req, res, next) => {
  try {
    const Items = await Item.findAll()
    res.status(200).json(Items)
  } catch (error) {
    next(error)
  }
})

router.get("/:id", async (req, res, next) => {
  const id = req.params.id
  try {
    const targetItem = await Item.findByPk(id)
    if (targetItem) {
      res.status(200).json(targetItem)
    } else {
      res.status(404).json({ message: "Item not found" })
    }
  } catch(error) {
    next(error)
  }
})

router.post("/", async (req, res, next) => {
  try {
    const createdItem = await Item.create(req.body)
    res.status(201).json(createdItem)
  } catch(error) {
    next(error)
  }
})

router.put("/:id", async (req, res, next) => {
  const id = req.params.id
  try {
    const updatedItem = await Item.update(req.body, {
      where : { id }
    })
    res.status(202).json(updatedItem)
  } catch(error) {
    next(error)
  }
})

router.delete("/:id", async (req, res, next) => {
  const id = req.params.id
  try {
    const deletedItem = await Item.destroy({
      where : { id }
    })
    if (deletedItem) {
      res.status(203).send("Item deleted")
    } else {
      res.status(404).json({ message: "Item not found" })
    }
  } catch(error) {
    next(error)
  }
})

module.exports = router