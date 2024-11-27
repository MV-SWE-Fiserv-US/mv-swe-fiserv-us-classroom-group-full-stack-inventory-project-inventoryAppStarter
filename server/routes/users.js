const express = require('express')
const { Item, User } = require('../models/index');
const router = express.Router()


// GET /users
router.get('/', async (req, res, next) => {
    try {
      const users = await User.findAll()
      res.send(users)
    } catch (error) {
      next(error)
    }
  })
  
  // GET /users/:userId
  router.get('/:id', async (req, res, next) => {
    try {
      const user = await User.findByPk(req.params.id, {
        include: [{ model: Item }]
      })
  
      if (!user) {
        res.status(404)
        next()
      } else {
        res.send(user)
      }
    } catch (error) {
      next(error)
    }
  })

  router.post('/login', async (req, res, next) => {
    try {
      const { username, password } = req.body
      const newUser = await User.create({ username, password });
      res.send(newUser);
    } catch (error) {
      next("error creating user: ", error)
    }
  })
  
  module.exports = router