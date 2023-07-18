const {Schema, model} = require("mongoose")

const expenseSchema = new Schema({
    groupId: {
        type: Schema.Types.ObjectId,
        ref: 'Group',
        required: true
    },
    description: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 50,
        trim: true
    },
    category: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 32,
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
}, { timestamps: true });


const group = model("expense", expenseSchema);
module.exports = expense;