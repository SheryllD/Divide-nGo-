const express = require('express');
const router = express.Router();
const User = require('../models/User.model'); 
const bcrypt = require('bcryptjs')

/* GET Welcome User */
router.get("/UserProfile", (req, res, next) => {
    res.render("LoggedInUser/UserProfile");
  }); 

module.exports = router;