const express = require("express")
const { Order, Item, User } = require("../models")
const router = express.Router()

// GET /orders
router.get("/", async (req, res, next) => {
    try {
        const orders = await Order.findAll()
        res.json(orders)
    } catch (error) {
        next(error)
    }
})

// GET /orders/:id
router.get("/:id", async (req, res, next) => {
    try {
        const order = await Order.findByPk(req.params.id, { include: [Item] })
        res.json(order)
    } catch (error) {
        next(error)
    }
})

// POST /orders
router.post("/", async (req, res, next) => {
    try {
        const order = await Order.create(req.body)
        res.json(order)
    } catch (error) {
        next(error)
    }
})

// POST /orders/:userId
router.post("/:userId", async (req, res, next) => {
    try {
        const user = await User.findByPk(req.params.userId)
        const salesTax = 0.07
        let total = 0
        let orderItems = []
        user.cart.forEach((item) => {
        total += item.price
        orderItems.push(item.id)
        })
        total += total * salesTax
        total = total.toFixed(2)
        const order = await Order.create({ total, status: "Pending" })
        await order.setItems(orderItems)
        await order.setUser(user)
        await user.update({ ...user, cart: [] })
        res.json(order)
    } catch (error) {
        next(error)
    }
})

// PUT /orders/:id
router.put("/:id", async (req, res, next) => {
    try {
        const order = await Order.findByPk(req.params.id)
        await order.update(req.body)
        res.json(order)
    } catch (error) {
        next(error)
    }
})

// DELETE /orders/:id
router.delete("/:id", async (req, res, next) => {
    try {
        const order = await Order.findByPk(req.params.id)
        await order.destroy()
        res.json(order)
    } catch (error) {
        next(error)
    }
})

module.exports = router