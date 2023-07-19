const {Schema, model} = require("mongoose")

const expenseSchema = new Schema({
    groupName: {
        type: Schema.Types.ObjectId,
        ref: 'Group',
        required: true
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    category: {
        type: String,
        required: false,
        trim: true
    },
    amount: {
        type: Number,
        required: true,
        min: 0
    },
    paidBy: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
}, 
{ timestamps: true });

const Expense = model("Expense", expenseSchema);
module.exports = Expense;