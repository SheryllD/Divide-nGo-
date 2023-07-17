const user = require('../models/User.model');

const express = require('express');
const router = express.Router();

const bcrypt = require('bcryptjs');

const saltRounds = 10;

const User = require("../models/User.model");

/* GET signup page */
router.get("/signup", (req, res, next) => {
  res.render("../views/auth/signup.ejs");
});

/* post data to register user */
router.post("/signup", (req, res, next) => {
  const { username, email, password } = req.body;
  
  if (email === "" || password === "") {
    res.render("auth/login", {errorMessage: "Please enter email and password to login."});
    
    return;
  };
  User.findOne({ email })
  .then((user) => {
    if (!user) {
      res.render("auth/login", { errorMessage: "Email is not registered. Try with other email." });
      return;
    } else if (bcryptjs.compareSync(password, user.passwordHash)) {
      req.session.user = user;
      res.redirect("/user-profile");
    } else {
      res.render("auth/login", { errorMessage: "Incorrect password." });
    }
  })
  .catch((error) => next(error));
});
/* GET Login page */
router.get("/login", (req, res, next) => {
    res.render("index");
  });
  
  /* post data to check if our user is in the database */
  router.get("/login", (req, res, next) => {
      res.render("index");
    });

    /* Logout */

    router.post("/logout", (req, res) => {
      req.session.destroy();
      res.redirect("/");
    });
    
    router.get("/user-profile", (req, res) => {
      res.render("users/user-profile");
    });
  

module.exports = router;