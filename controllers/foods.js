const express = require("express");
const router = express.Router({ mergeParams: true });
const User = require("../models/user.js");

// INDEX – show all pantry items
router.get("/", async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    const pantry = user.pantry || [];
    res.render("foods/index.ejs", { pantry, user });
  } catch (error) {
    console.log(error);
    res.redirect("/");
  }
});

// NEW — show form
router.get("/new", (req, res) => {
  res.render("foods/new.ejs", { user: { _id: req.params.userId } });
});

// CREATE — add food
router.post("/", async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    user.pantry.push(req.body);
    await user.save();
    res.redirect(`/users/${user._id}/foods`);
  } catch (error) {
    console.log(error);
    res.redirect("/");
  }
});

// DELETE
router.delete("/:itemId", async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    user.pantry.id(req.params.itemId).deleteOne();
    await user.save();
    res.redirect(`/users/${user._id}/foods`);
  } catch (error) {
    console.log(error);
    res.redirect("/");
  }
});

// EDIT — show form
router.get("/:itemId/edit", async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    const food = user.pantry.id(req.params.itemId);
    res.render("foods/edit.ejs", { food, user });
  } catch (error) {
    console.log(error);
    res.redirect("/");
  }
});

// UPDATE
router.put("/:itemId", async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    const food = user.pantry.id(req.params.itemId);

    food.set(req.body);
    await user.save();

    res.redirect(`/users/${user._id}/foods`);
  } catch (error) {
    console.log(error);
    res.redirect("/");
  }
});

module.exports = router;
