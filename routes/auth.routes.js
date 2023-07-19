const express = require('express');
const router = express.Router();
const User = require('../models/User.model'); 
const bcrypt = require("bcryptjs")

/* GET signup page */
router.get("/signup", (req, res, next) => {
  res.render("auth/signup");
}); 

/* post data to register user */
router.post("/signup", async(req, res, next) => {
console.log(req.body)
const payload = { ...req.body}

delete payload.password

const salt = bcrypt.genSaltSync(13)
const passwordHash = bcrypt.hashSync(req.body.password, salt)
  if (req.body.email === '' || req.body.password === '') {
    res.render("auth/signup", {
      errorMessage: "Please enter both email and password to sign up.",
    });
    return;
  }

  try { 
  const newUser = await User.create({ ...payload, passwordHash}) 
  res.redirect("/auth/login")
} catch (err) {
  console.log(err)
}
});

// we also need to create a route for the user to post their bill/expense 
// within the group we should be also able to get the info of other users expenses

/* GET Login page */
router.get("/login", (req, res, next) => {
  res.render("auth/login");
  });

// post data to check if our user is our user 
router.post("/login", async(req, res, next) => {
  console.log(req.body)
  try {
    const currentUser = req.body
    const checkedUser = await User.findOne({ email: currentUser.email.toLowerCase()})
      if (checkedUser) {
      // User exists
      if(bcrypt.compareSync(currentUser.password, checkedUser.passwordHash)){
        //password is correct
        const loggedUser = { ...checkedUser._doc}
        delete loggedUser.passwordHash
        console.log(loggedUser) 
        req.session.currentUser = loggedUser
        res.redirect("/LoggedInUser/profile")
      } else {
        // password is incorrect 
        console.log("Password is incorrect")
      res.render("auth/login", {errorMessage: "Incorrect email or password. Please try again.", 
      payload: {email: currentUser.email}, 
    })
   } 
  } else {
        // no user exists with this email
        console.log("No user with this email")
        res.render("auth/login", {
          errorMessage: "No user with this email", 
          payload: { email: currentUser.email}, 
        })
      }
  } catch (error) {
    console.log("error occured: ", error)
    res.render("auth/login", {
      errorMessage: "Check with the server", 
      payload: { email: currentUser.email}, 
    })
  }
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
    
    const isPasswordValid = bcrypt.compareSync(password, user.passwordHash);
    if (isPasswordValid) {
      res.redirect('LoggedInUser/UserProfile.ejs'); // Redirect to the user profile page after successful login
    } else {
      res.render('auth/login', { errorMessage: 'Incorrect password.' });
    }
  }); 

router.get('/UserProfile', (req, res) => res.render('LoggedInUser/UserProfile.ejs'));

// GET /auth/logout
router.get('/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error("Error destroying session:", err);
      res.json({ msg: "Error logging out" });
    } else {
      res.clearCookie('connect.sid'); // Clear the session cookie
      res.redirect('/auth/login'); // Redirect to the login page after successful logout
    }
  });
});

module.exports = router;