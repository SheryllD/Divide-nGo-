const express = require('express');
const router = express.Router();
const User = require('../models/User.model'); 

/* GET signup page */
router.get("/signup", (req, res, next) => {
  res.render("auth/signup");
}); 

/* post data to register user */
router.post("/signup", async(req, res, next) => {
//    res.render("index");
let newUser = await User.create(req.body) 
res.redirect("/auth/login")
  });
// bcrypt 



// we also need to create a route for the user to post their bill/expense 
// within the group we should be also able to get the info of other users expenses

/* GET Login page */
router.get("/login", (req, res, next) => {
    res.render("auth/login");
  });
  
  /* post data to check if our user is in the database */
  router.get("/login", (req, res, next) => {
      res.render("index");
    });
  

module.exports = router;