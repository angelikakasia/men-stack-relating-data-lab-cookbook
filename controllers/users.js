const express = require('express');
const router = express.Router();
const User = require('../models/user.js');

// INDEX ROUTE - show all users
// SHOW ROUTE - view another user's pantry
router.get('/', async (req, res) => {
  try {
    const user = await User.find();
    res.render('users/show.ejs', { user: user });
  } catch (err) {
    console.log(err);
    res.redirect('/users');
  }
});


module.exports = router;
