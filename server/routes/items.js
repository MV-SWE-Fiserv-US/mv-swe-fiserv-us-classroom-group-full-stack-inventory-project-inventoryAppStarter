const express = require('express')
const { Item, User } = require('../models/index');
const router = express.Router()


//Get All the items /items
router.get('/', async (req, res) => {
    try {
        const items = await Item.findAll()
        res.send(items)
    } catch (error) {
        console.log("error getting items", error);
    }
})

router.get('/:id',async(req,res)=>{
    const itemId = req.params.id;
    const item = await Item.findByPk(itemId);
    res.json(item);
})
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
            res.status(404).json({ error: 'item not found.' });
        }
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while fetching the item.' });
    }
});