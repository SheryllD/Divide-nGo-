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
  });

/* GET Login page */
router.get("/login", (req, res, next) => {
    res.render("index");
  });
  
  /* post data to check if our user is in the database */
  router.get("/login", (req, res, next) => {
      res.render("index");
    });
  

module.exports = router;