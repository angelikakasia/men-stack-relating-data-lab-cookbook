const express = require('express');
const router = express.Router();
const User = require('../models/user.js');
const Recipe = require('../models/recipe.js');

// COMMUNITY PAGE — list all users
router.get('/', async (req, res) => {
  try {
    const users = await User.find({});
    res.render('users/index.ejs', { users });
  } catch (err) {
    console.log(err);
    res.redirect('/');
  }
});

// SHOW PAGE — view another user's recipes
router.get('/:userId', async (req, res) => {
  try {
    const user = await User.findById(req.params.userId).populate('recipes');
    res.render('users/show.ejs', { profileUser: user });
  } catch (err) {
    console.log(err);
    res.redirect('/');
  }
});

module.exports = router;
