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

router.get('/search', async (req, res) => {
  const { name } = req.query;

  // Check if the 'name' query parameter is provided
  if (!name) {
    return res.status(400).json({ error: 'Name query parameter is required' });
  }

  try {
    // Log the search term to ensure it's coming through correctly
    console.log('Searching for items with name:', name);

    // Perform the search query using Sequelize's LIKE operator to match the name
    const items = await Item.findAll({
      where: {
        name: {
          [Sequelize.Op.like]: `%${name}%`,  // Wildcard search for partial matches
        },
      },
    });

    // If no items are found, return a 404 error
    if (items.length === 0) {
      return res.status(404).json({ message: 'No items found' });
    }

    // Send the items as a response
    res.json(items);
  } catch (error) {
    // Log the error and send a 500 Internal Server Error response
    console.error('Error in search route:', error);
    res.status(500).json({ error: 'An error occurred while fetching the items' });
  }
});






  
module.exports = router;
