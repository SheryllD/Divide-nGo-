const express = require('express');
const router = express.Router();

/* GET Welcome User */
router.get("/UserProfile", (req, res, next) => {
    res.render("LoggedInUser/UserProfile");
  }); 

module.exports = router;