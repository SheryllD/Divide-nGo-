const express = require('express');
const router = express.Router();

/* GET signup page */
router.get("/signup", (req, res, next) => {
  res.render("index");
});

/* post data to register user */
router.get("/login", (req, res, next) => {
    res.render("index");
  });

/* GET Login page */
router.get("/signup", (req, res, next) => {
    res.render("index");
  });
  
  /* post data to check if our user is in the database */
  router.get("/login", (req, res, next) => {
      res.render("index");
    });
  

module.exports = router;