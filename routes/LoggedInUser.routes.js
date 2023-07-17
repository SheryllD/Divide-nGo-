const express = require('express');
const router = express.Router();

/* GET Welcome User */
router.get("/welcomepage", (req, res, next) => {
    res.render("LoggedInUser/welcomepage");
  }); 

module.exports = router;