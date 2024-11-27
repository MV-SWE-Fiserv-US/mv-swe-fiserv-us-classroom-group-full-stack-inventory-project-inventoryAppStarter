const express = require('express')
const { Item, User } = require('../models/index');
const router = express.Router()
const { Op } = require('sequelize');

//Get All the items /items
router.get('/', async (req, res) => {
    try {
        const items = await Item.findAll()
        res.send(items)
    } catch (error) {
        console.log("error getting items", error);
    }
})
//Get the specific item by ID /items/:id
router.get('/:id', async (req, res) => {
    try {
        const itemId = req.params.id;
        const item = await Item.findByPk(itemId, {
            include: [{ model: User }]
        });
        console.log("Get specific item",item);
        if (item) {
            res.json(item);
        } else {
            res.status(404).json({ error: 'item not found.' + 'itemId' + itemId + error});
        }
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while fetching the item.' });
    }
});
//Post An Item 
router.post('/', async(req,res)=>{
    const item = await Item.create(req.body);
    res.json(item);

})
//Update a specific Item
router.put('/:id',async(req,res)=>{
    const updatedItem = await Item.update(req.body,{where :{id : req.params.id}});
    res.json(updatedItem);
})
//Delete a specific Item 
router.delete('/:id',async(req,res)=>{
    const deletedItem = await Item.destroy({where :{id : req.params.id}});
    res.json(deletedItem);
})

//const response = await fetch(`${apiURL}/items/search?${queryString}`);
router.get('/search', async (req, res) => {
    try {
      const { name, price, category } = req.query;
      console.log(name,price,category)
      const filters = {};
  
      if (name) {
        filters.name = { [Op.like]: `%${name}%` };
      }
  
      if (category) {
        filters.category = { [Op.like]: `%${category}%` };
      }
  
      if (price && !isNaN(price)) {
        filters.price = { [Op.lte]: parseFloat(price) };
      }
  
      if (Object.keys(filters).length === 0) {
        return res.status(400).json({ error: 'At least one search parameter is required' });
      }
  
      console.log('Filters:', filters);
  
      const items = await Item.findAll({ where: filters });
  
      if (items.length === 0) {
        return res.status(404).json({ message: 'No items found' });
      }
  
      return res.json(items);
    } catch (err) {
      console.error('Error fetching items:', err);  // Log the error stack
      res.status(500).json({
        error: 'An error occurred while fetching items',
        message: err.message,
        stack: err.stack,  // Include stack trace for debugging
      });
    }
  });
  





  
module.exports = router;
