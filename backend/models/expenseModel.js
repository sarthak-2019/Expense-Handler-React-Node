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
