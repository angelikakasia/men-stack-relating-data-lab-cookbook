require("dotenv").config();


const express = require("express");
const app = express();
const methodOverride = require("method-override");
const session = require("express-session");
const mongoose = require("mongoose");

const authController = require("./controllers/auth.js"); // .
const foodsController = require("./controllers/foods.js"); //*
const usersController = require("./controllers/users.js");// .

const isSignedIn = require("./middleware/is-signed-in.js"); // .
const passUserToView = require("./middleware/pass-user-to-view.js");//.

mongoose.connect(process.env.MONGODB_URI)
mongoose.connection.on('connected', () => {
    console.log(`Connected to MongoDB ${mongoose.connection.name}.`)
})
// MIDDLEWARE
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride("_method"));

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    
    }));


app.use(passUserToView);

// ROUTES
app.use("/auth", authController); // .
app.use(isSignedIn);
app.use("/users/:userId/foods", foodsController);// .
app.use("/users", usersController); //.

app.get("/", (req, res) => {
  res.render("index.ejs");
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
