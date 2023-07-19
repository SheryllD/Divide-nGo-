const express = require('express');
const router = express.Router();
const User = require('../models/User.model'); 
const bcrypt = require('bcryptjs')

/* GET Welcome User */
router.get("/profile", (req, res, next) => {
  console.log("hello", req.session) 
    res.render("LoggedInUser/UserProfile", {currentUser: req.session.currentUser});
  }); 

module.exports = router;