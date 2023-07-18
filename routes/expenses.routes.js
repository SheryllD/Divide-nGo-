const {Schema, model} = require("mongoose")

const Expense = require('../models/expense.model');

// GET /api/expenses/group/:id
router.get('/Group/:id', (req, res) => {
  Expense.find({ groupId: req.params.id })
    .then(expenses => {
      if (expenses.length) {
        return res.json(expenses);
      } else {
        return res.status(400).json({ msg: "No expenses found" });
      }
    })
    .catch(err => res.json({ msg: "Internal Server Error", err }));
});

// GET /api/expenses/user/:id
router.get('/', (req, res) => {
  res.json({ msg: "Get all expenses in a group" });
});

// POST /api/expenses
router.post('/', (req, res) => {
  const newExpense = new Expense({
    groupName: req.body.groupId,
    description: req.body.description,
    category: req.body.category,
    amount: req.body.amount,
    paidBy: req.body.paidBy
  });

  newExpense.save()
    .then(expense => res.json({ msg: "Expense Added", expense }))
    .catch(err => res.json({ msg: "Internal Server Error", err }));
});

// PUT /api/expenses/:id
router.put('/:id', (req, res) => {
  res.json({ msg: "Update an expense in a group" });
});

// DELETE /api/expenses/:id
router.delete('/:id', (req, res) => {
  res.json({ msg: "Delete an expense in a group" });
});

module.exports = router;
