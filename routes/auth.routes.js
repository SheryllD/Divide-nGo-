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

  if (email === '' || password === '') {
    res.render("auth/signup", {
      errorMessage: "Please enter both email and password to sign up.",
    });
    return;
  }

try { 
  const newUser = await User.create(payload) 
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
        res.redirect("/LoggedInUser/profile")
      } else {
        // password is incorrect 
        console.log("Password is incorrect")
      res.render("auth/login", {errorMessage: "Password is incorrect", payload: {email: currentUser.email}, 
    })
      }
    } else {
        // no user exists with this email
        console.log("No user with this email")
      }
  } catch (err) {console.log("err occured: ", err)
}});

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
  })
  .catch(error => next(error));

router.get('/UserProfile', (req, res) => res.render('LoggedInUser/UserProfile.ejs'));

module.exports = router;


















// const express = require('express');
// const router = express.Router();
// const User = require('../models/User.model'); 
// const bcrypt = require("bcryptjs")

// /* GET signup page */
// router.get("/signup", (req, res, next) => {
//   res.render("auth/signup");
// }); 

// /* post data to register user */
// router.post("/signup", async(req, res, next) => {
// console.log(req.body)
// const payload = { ...req.body}
// delete payload.password
// const salt = bcrypt.genSaltSync(13)

// payload.passwordHash = bcrypt.hashSync(req.body.password, salt)

// try { 
//   const newUser = await User.create(payload) 
//   res.send(newUser)
// } catch (err) {
//   console.log(err)
// }
// });

// // bcrypt 
// // we also need to create a route for the user to post their bill/expense 
// // within the group we should be also able to get the info of other users expenses

// /* GET Login page */
// router.get("/login", (req, res, next) => {
//     res.render("auth/login");
//   });
  
//   /* post login route to process the data */
  
//   router.post('/login', (req, res, next) => {
//     const { email, password } = req.body;
    
//     if (email === '' || password === '') {
//       res.render('auth/login', {
//         errorMessage: 'Please enter both, email and password to login.'
//       });
//       return;
//     }
   
//     user.findOne({ email })
//       .then(user => {
//         if (!user) {
//           res.render('auth/login', { errorMessage: 'Email is not registered. Try with other email.' });
//           return;
//         } else if (bcryptjs.compareSync(password, user.passwordHash)) {
//           res.render('LoggedInUser/UserProfile', { user });
//         } else {
//           res.render('auth/login', { errorMessage: 'Incorrect password.' });
//         }
//       })
//       .catch(error => next(error));
//   });
  
//   router.get('/userProfile', (req, res) => res.render('users/UserProfile'));

// module.exports = router;




