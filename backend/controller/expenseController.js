const Expense = require('../models/expenseModel');
const User = require('../models/userModel');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');

exports.createExpense = catchAsync(async (req, res, next) => {
  req.body.user = req.user._id;
  console.log(req.body);
  const newExpense = await Expense.create(req.body);
  res.status(201).json({
    status: 'success',
  });
});

exports.userName = catchAsync(async (req, res, next) => {
  const id = req.user._id;
  const user = await User.findById(id);
  res.status(200).json({
    status: 'success',
    data: {
      name: user.name,
    },
  });
});

exports.ExpenseList = catchAsync(async (req, res, next) => {
  const id = req.user._id;
  const expense = await Expense.find({ user: { $eq: id } }).select('-user');
  res.status(200).json({
    status: 'success',
    data: {
      expense,
    },
  });
});

exports.getExpense = catchAsync(async (req, res, next) => {
  const id = req.params.id;

  const expense = await Expense.findById(id);

  if (!expense) {
    return next(new AppError('No Expense found with that ID', 404));
  }
  res.status(200).json({
    status: 'sucess',
    data: {
      expense,
    },
  });
});
exports.updateExpense = catchAsync(async (req, res, next) => {
  const expense = await Expense.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!expense) {
    return next(new AppError('No Expense found with that ID', 404));
  }
  res.status(200).json({
    status: 'success',
    data: {
      tour,
    },
  });
});
exports.deleteExpense = catchAsync(async (req, res, next) => {
  const id = req.params.id;
  const expense = await Expense.findByIdAndDelete(id);
  if (!expense) {
    return next(new AppError('No Expense found with that ID', 404));
  }
  res.status(204).json({
    status: 'sucess',
    data: null,
  });
});
