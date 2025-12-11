const express = require("express");
const router = express.Router();
const User = require("../models/user.js");


// INDEX ROUTE - show all pantry items
router.get('/', async (req, res) => {
  try {
    const user = await User.findById(req.session.user._id);

    res.render('foods/index.ejs', {
      pantry: user.pantry
    });

  } catch (err) {
    console.log(err);
    res.redirect('/');
  }
});



// NEW — show form
router.get("/new", (req, res) => {
  res.render("foods/new.ejs");
});

// CREATE — add food
router.post("/", async (req, res) => {
  try {
    const user = await User.findById(req.session.user._id);
    user.pantry.push(req.body); //Push the form data (req.body) into the pantry array
    await user.save(); //Save the updated user document
    res.redirect(`/users/${user._id}/foods`);
  } catch (error) {
    console.log(error);
    res.redirect("/");
  }
});

// DELETE ROUTE - delete a single food item
router.delete('/:itemId', async (req, res) => {
  try {
    const user = await User.findById(req.session.user._id);

    // deleteOne on embedded documents
    user.pantry.id(req.params.itemId).deleteOne();

    await user.save();

    res.redirect(`/users/${user._id}/foods`);
  } catch (err) {
    console.log(err);
    res.redirect('/');
  }
});


// EDIT — show form

router.get('/:itemId/edit', async (req, res) => {
  try {
    // Find the current user
    const user = await User.findById(req.session.user._id);

    // Find the specific food item in the pantry
    const food = user.pantry.id(req.params.itemId);

    // Render edit.ejs and pass the food item
    res.render('foods/edit.ejs', { food: food, user: user });

  } catch (err) {
    console.log(err);
    res.redirect('/');
  }
});


// UPDATE ROUTE - update a specific food item
router.put('/:itemId', async (req, res) => {
  try {
    const user = await User.findById(req.session.user._id);

    // Find the food subdocument
    const food = user.pantry.id(req.params.itemId);

    // Update its fields
    food.name = req.body.name;

    // Save the updated user
    await user.save();

    res.redirect(`/users/${user._id}/foods`);
  } catch (err) {
    console.log(err);
    res.redirect('/');
  }
});


module.exports = router;
