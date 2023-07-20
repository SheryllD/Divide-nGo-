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
router.get('/expenses/:id/edit', async (req, res, next) => {
  try {
    const expense = await Expense.findById(req.params.id);
    if (!expense) {
      return res.status(404).send("Expense not found");
    }
    res.render("LoggedInUser/EditExpense", { expense });
  } catch (error) {
    next(error);
  }
});


// POST updated expense data
router.post('/expenses/:id/update', async (req, res, next) => {
  try {
    const expenseId = req.params.id;
    const updatedExpense = {
      description: req.body.description,
      amount: req.body.amount
      // Add other fields if you have any
    };

    // Update the expense using findByIdAndUpdate
    await Expense.findByIdAndUpdate(expenseId, updatedExpense);

    res.redirect('/LoggedInUser/profile');
  } catch (error) {
    next(error);
  }
});


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