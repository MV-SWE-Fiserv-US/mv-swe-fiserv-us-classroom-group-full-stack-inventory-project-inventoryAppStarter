const {Item} = require('../models/Item.js')
const express = require('express');
const router = express.Router();
/*router.use(express.json());*/

router.get('/', async (req, res) => {
    try {
      const items = await Item.findAll();
      res.status(200).json(items);
    } catch (error) {
      res.status(500).json({ error: 'Unable to fetch items', details: error.message });
    }
  });

  router.get('/:id', async (req, res) => { /* The front end should be able to fetch index value that can be utilized*/
    try {
      const newitem = await Item.findByPk(req.params.id);
      if (!newitem) return res.status(404).json({ error: 'Item not found' });
      res.status(200).json(newitem);
    } catch (error) {
      res.status(500).json({ error: 'Unable to fetch Item', details: error.message });
    }
  });


  router.post('/',
/*[
    check("username").trim().notEmpty().withMessage('UserName is required and cannot be empty or whitespace'),
    check('username').trim().isEmail().withMessage('It should be an email address')
],*/
  
  async (req, res) => {
  /*  const errors = validationResult(req);
    if (!errors.isEmpty()) {
      // Return errors if validation fails
      return res.status(400).json({ error: errors.array() });
    }*/

    try {
      const { name,price, description,category, image } = req.body;
      const newUser = await Item.create({ name,price, description,category, image });
      res.status(200).json(newUser);
    } catch (error) {
      res.status(400).json({ error: 'Unable to create Item', details: error.message });
    }
  }
);

router.put('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const fieldsToUpdate = req.body;

        // Ensure the body is not empty
        if (Object.keys(fieldsToUpdate).length === 0) {
            return res.status(400).json({ error: 'No fields provided to update' });
        }

        // Update the show with the provided fields
        const [updated] = await Item.update(fieldsToUpdate, { where: { id } });

        if (!updated) {
            return res.status(404).json({ error: 'Item not found' });
        }

        // Fetch the updated show
        const updateditem = await Item.findByPk(id);
        res.status(200).json(updateditem);
    } catch (error) {
        res.status(400).json({ error: 'Unable to update item', details: error.message });
    }
});



router.delete('/:id', async (req, res) => { 
    try {
      const deleted = await Item.destroy({ where: { id: req.params.id } });
      if (!deleted) return res.status(404).json({ error: 'Item not found' });
      res.status(200).send(); // Successful deletion, no content
    } catch (error) {
      res.status(500).json({ error: 'Unable to delete Item', details: error.message });
    }
  });

module.exports = router;