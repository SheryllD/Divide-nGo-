const {Schema, model} = require("mongoose")
const crypto = require('crypto');

const expenseSchema = new Schema({
    description: {
      type: String,
      required: true
    },
    amount: {
      type: Number,
      required: true
    },
    date: {
      type: Date,
      default: Date.now
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true
    }

  });

const Expense = model("Expense", expenseSchema);
module.exports = Expense;