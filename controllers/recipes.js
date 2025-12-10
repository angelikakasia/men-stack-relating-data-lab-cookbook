const express = require('express');
const router = express.Router();
const Recipe = require('../models/recipe.js');
const Ingredient = require('../models/ingredient.js');
const User = require('../models/user.js');

// INDEX – show all recipes for the logged-in user
router.get('/', async (req, res) => {
  try {
    const recipes = await Recipe.find({ owner: req.session.user._id });
    res.render('recipes/index.ejs', { recipes });
  } catch (err) {
    console.log(err);
    res.redirect('/');
  }
});

// NEW – show form
router.get('/new', async (req, res) => {
  try {
    const ingredients = await Ingredient.find({});
    res.render('recipes/new.ejs', { ingredients });
  } catch (err) {
    console.log(err);
    res.redirect('/');
  }
});

// CREATE
router.post('/', async (req, res) => {
  try {
    const recipe = new Recipe(req.body);
    recipe.owner = req.session.user._id;
    await recipe.save();

    // add to user's recipe list
    const user = await User.findById(req.session.user._id);
    user.recipes.push(recipe._id);
    await user.save();

    res.redirect('/recipes');
  } catch (err) {
    console.log(err);
    res.redirect('/');
  }
});

// SHOW
router.get('/:id', async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id).populate('ingredients');
    res.render('recipes/show.ejs', { recipe });
  } catch (err) {
    console.log(err);
    res.redirect('/recipes');
  }
});

// EDIT
router.get('/:id/edit', async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id);
    const ingredients = await Ingredient.find({});
    res.render('recipes/edit.ejs', { recipe, ingredients });
  } catch (err) {
    console.log(err);
    res.redirect('/recipes');
  }
});

// UPDATE
router.put('/:id', async (req, res) => {
  try {
    await Recipe.findByIdAndUpdate(req.params.id, req.body);
    res.redirect(`/recipes/${req.params.id}`);
  } catch (err) {
    console.log(err);
    res.redirect('/recipes');
  }
});

// DELETE
router.delete('/:id', async (req, res) => {
  try {
    await Recipe.findByIdAndDelete(req.params.id);
    res.redirect('/recipes');
  } catch (err) {
    console.log(err);
    res.redirect('/recipes');
  }
});

module.exports = router;
