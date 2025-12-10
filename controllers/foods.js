const express = require('express');
const router = express.Router();
const User = require('../models/user.js');

// INDEX — Show all items in pantry
router.get('/', async (req, res) => {
  try {
    const user = await User.findById(req.session.user._id);
    res.render('foods/index.ejs', { pantry: user.pantry, user });
  } catch (err) {
    console.log(err);
    res.redirect('/');
  }
});

// NEW — Form page for adding new item
router.get('/new', (req, res) => {
  res.render('foods/new.ejs', { user: req.session.user });
});

// CREATE — Add new item to pantry
router.post('/', async (req, res) => {
  try {
    const user = await User.findById(req.session.user._id);

    user.pantry.push(req.body);
    await user.save();

    res.redirect(`/users/${user._id}/foods`);
  } catch (err) {
    console.log(err);
    res.redirect('/');
  }
});

// EDIT — Form to edit specific item
router.get('/:itemId/edit', async (req, res) => {
  try {
    const user = await User.findById(req.session.user._id);
    const item = user.pantry.id(req.params.itemId);

    res.render('foods/edit.ejs', { user, item });
  } catch (err) {
    console.log(err);
    res.redirect('/');
  }
});

// UPDATE — Apply changes to item
router.put('/:itemId', async (req, res) => {
  try {
    const user = await User.findById(req.session.user._id);
    const item = user.pantry.id(req.params.itemId);

    item.set(req.body);
    await user.save();

    res.redirect(`/users/${user._id}/foods`);
  } catch (err) {
    console.log(err);
    res.redirect('/');
  }
});

// DELETE — Remove item from pantry
router.delete('/:itemId', async (req, res) => {
  try {
    const user = await User.findById(req.session.user._id);

    user.pantry.id(req.params.itemId).deleteOne();
    await user.save();

    res.redirect(`/users/${user._id}/foods`);
  } catch (err) {
    console.log(err);
    res.redirect('/');
  }
});

module.exports = router;
