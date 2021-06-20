const mongoose = require('mongoose');

const expenseSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Title cannot cannot be empty'],
  },
  amount: {
    type: Number,
    required: [true, 'Amount cannot cannot be empty'],
  },
  description: {
    type: String,
    default: 'No Description for this Expense Item.Please add if you want to!',
  },
  date: {
    type: Date,
    required: [true, 'Date cannot cannot be empty'],
  },
  user: {
    type: String,
    required: [true, 'Expense must belong to a user'],
  },
});

const Expense = mongoose.model('Expense', expenseSchema);
module.exports = Expense;
