const express = require('express');
const router = express.Router();
const auth = require('../../middelware/auth');

// Item Model
const Item = require('../../models/Item');

// @route   GET api/items
// @desc    Get All Items
// @access   Public
router.get('/', (req, res) => {
  Item.find()
    .sort({ date: -1 })
    .then(items => res.json(items));
});

// @route   POST api/items
// @desc    Create item
// @access   Private
router.post('/', auth, (req, res) => {
  const newItem = new Item({
    name: req.body.name
  });
  newItem.save().then(item => res.json(item));
});

// @route   DELETE api/items/:id
// @desc    Delete item
// @access   Private
router.delete('/:id', auth, (req, res) => {
  Item.findByIdAndDelete(req.params.id)
    .then(() => res.json({ success: true }))
    .catch(err => res.status(400).json({ success: false, error: err }));
});

// TODO: make put to edit item

module.exports = router;
