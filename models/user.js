const mongoose = require("mongoose");

const foodSchema = new mongoose.Schema({
  name: String
});

const userSchema = new mongoose.Schema({
  username: String,
  password: String,
  pantry: [foodSchema]   
});

module.exports = mongoose.model("User", userSchema);
