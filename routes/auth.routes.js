const express = require('express');
const router = express.Router();
const User = require('../models/User.model'); 
const bcrypt = require('bcryptjs')

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
  
  /* post login route to process the data */
  router.post('/login', (req, res, next) => {
    const { email, password } = req.body;
   
    if (email === '' || password === '') {
      res.render('auth/login', {
        errorMessage: 'Please enter both, email and password to login.'
      });
      return;
    }
   
    user.findOne({ email })
      .then(user => {
        if (!user) {
          res.render('auth/login', { errorMessage: 'Email is not registered. Try with other email.' });
          return;
        } else if (bcryptjs.compareSync(password, user.passwordHash)) {
          res.render('/LoggedInUser/welcomepage', { user });
        } else {
          res.render('auth/login', { errorMessage: 'Incorrect password.' });
        }
      })
      .catch(error => next(error));
  });
  
module.exports = router;