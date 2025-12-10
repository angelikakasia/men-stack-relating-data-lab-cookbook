const express = require('express');
const router = express.Router();
const Ingredient = require('../models/ingredient.js');

// INDEX – show all ingredients
router.get('/', async (req, res) => {
  try {
    const ingredients = await Ingredient.find({});
    res.render('ingredients/index.ejs', { ingredients });
  } catch (err) {
    console.log(err);
    res.redirect('/');
  }
});

// NEW – show form
router.get('/new', (req, res) => {
  res.render('ingredients/new.ejs');
});

// CREATE
router.post('/', async (req, res) => {
  try {
    await Ingredient.create(req.body);
    res.redirect('/ingredients');
  } catch (err) {
    console.log(err);
    res.redirect('/ingredients');
  }
});

// SHOW (optional depending on your views)
router.get('/:id', async (req, res) => {
  try {
    const ingredient = await Ingredient.findById(req.params.id);
    res.render('ingredients/show.ejs', { ingredient });
  } catch (err) {
    console.log(err);
    res.redirect('/ingredients');
  }
});

// DELETE (if needed)
router.delete('/:id', async (req, res) => {
  try {
    await Ingredient.findByIdAndDelete(req.params.id);
    res.redirect('/ingredients');
  } catch (err) {
    console.log(err);
    res.redirect('/ingredients');
  }
});

module.exports = router;
