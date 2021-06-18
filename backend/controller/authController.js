const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
const AppError = require('./../utils/appError');
const catchAsync = require('./../utils/catchAsync');
const { promisify } = require('util');

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};
const createSendToken = (user, statusCode, res) => {
  const token = signToken(user._id);
  const cookieOptions = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };
  if (process.env.NODE_ENV === 'production') cookieOptions.secure = true;

  res.cookie('jwt', token, cookieOptions);

  res.status(statusCode).json({
    status: 'success',
    token,
  });
};
exports.signUp = catchAsync(async (req, res, next) => {
  const { name, email, password, passwordVerify } = req.body;

  // save a new user account to the db

  const savedUser = await User.create({
    name,
    email,
    password,
    passwordVerify,
  });
  createSendToken(savedUser, 201, res);
});

exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return next(new AppError('Please provide email and password', 400));
  }
  const user = await User.findOne({ email }).select('+password');

  if (!user || !(await user.correctPassword(password, user.password))) {
    return next(new AppError('Incorrect email or password', 401));
  }

  createSendToken(user, 200, res);
});

exports.protect = catchAsync(async (req, res, next) => {
  // 1)Getting token and check if it exist
  const token = req.cookies.jwt;

  if (!token) {
    return next(
      new AppError('You are Not logged In! Please log in to get access', 401)
    );
  }

  // 2)Verification token
  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

  // 3)Check if user still exist

  const currentUser = await User.findById(decoded.id);

  if (!currentUser) {
    return next(
      new AppError('The user belonging to this token does no longer exist', 401)
    );
  }

  // GRANT ACCESS TO PROTECTED ROUTES
  req.user = currentUser;
  next();
});

exports.logout = function (req, res) {
  res.clearCookie('jwt');
  res.status(200).json({
    data: 'User Logged out Successfully',
  });
};

exports.loggedIn = function (req, res) {
  try {
    const token = req.cookies.jwt;
    if (!token) return res.json(false);

    jwt.verify(token, process.env.JWT_SECRET);

    res.send(true);
  } catch (err) {
    res.json(false);
  }
};
