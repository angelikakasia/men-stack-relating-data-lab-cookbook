require("dotenv").config();
require("./config/database.js");  // ⭐ ADD THIS ⭐

const express = require("express");
const app = express();
const methodOverride = require("method-override");
const session = require("express-session");
const MongoStore = require("connect-mongo");

const authController = require("./controllers/auth.js");
const foodsController = require("./controllers/foods.js");
const usersController = require("./controllers/users.js");

const isSignedIn = require("./middleware/is-signed-in.js");
const passUserToView = require("./middleware/pass-user-to-view.js");

// MIDDLEWARE
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride("_method"));

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl: process.env.MONGODB_URI,
    }),
  })
);

app.use(passUserToView);

// ROUTES
app.use("/auth", authController);
app.use(isSignedIn);
app.use("/users/:userId/foods", foodsController);
app.use("/users", usersController);

app.get("/", (req, res) => {
  res.render("index.ejs");
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
