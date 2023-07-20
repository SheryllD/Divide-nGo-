const express = require('express');
const router = express.Router();
const User = require('../models/User.model'); 
const Expense = require("../models/expense.model"); 
const bcrypt = require('bcryptjs')

/* GET Welcome User */
router.get("/profile", async (req, res, next) => {
  console.log("hello", req.session) 
  const userExpenses = await Expense.find({userId: req.session.currentUser})
    res.render("LoggedInUser/UserProfile", {currentUser: req.session.currentUser, userExpenses});
  }); 

// after req.session, 
  // Get expense/create route to show user creation form  
  router.post("/profile", async (req, res, next) => {
   console.log("hello", req.body) 
const newExpense = await Expense.create({ ...req.body, userId: req.session.currentUser._id})

      res.redirect("/LoggedInUser/profile");
    }); 

  // Get update expense page
  router.get('/expenses/:id', async (req, res, next) => {
      const expense = await Expense.findById(req.params.expenseId)
      res.redirect("/LoggedinUser/update"); 
    })

 /* POST updated expense data */
router.post('/expenses/:id', async (req, res, next) => {
  console.log(req.body, req.params.id)
  try {
  await Expense.findByIdAndUpdate(req.params.expenseId, req.body)
  res.redirect('/LoggedInUser/profile')
  } catch (error) {
  console.log(error)
 };
})

    //Delete expense 
    router.get("/expenses/:id", async (req, res, next) => {
      try {
        await Expense.findByIdAndDelete(req.params.id);
        res.redirect("/LoggedInUser/profile");
      } catch (error) {
        next(error);
      }
    });
 
module.exports = router;