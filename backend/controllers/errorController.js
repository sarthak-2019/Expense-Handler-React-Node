/* eslint-disable */
const AppError = require('./../utils/appError');

const handleCastErrorDB = (err) => {
  const message = `Invalid ${err.path}: ${err.value}`;
  return new AppError(message, 400);
};
const handleDuplicateFieldsDB = (err) => {
  const value = err.errmsg.match(/(["'])(\\?.)*?\1/)[0];
  // console.log(value);

  const message = `Duplicate field value: ${value}. Please use another value!`;
  return new AppError(message, 400);
};
const handleValidationErrorDB = (err) => {
  const errors = Object.values(err.errors).map((el) => el.message);
  console.log(errors);
  const message = `Invalid input data. ${errors.join('. ')}`;
  return new AppError(message, 400);
};

const handleJWTError = (err) =>
  new AppError('Invalid token.Please login again!', 401);

const handleJWTExpiredError = (err) =>
  new AppError('Your token has expired! Please log in again', 401);

const sendErrorDev = (err, res) => {
  res.status(err.statusCode).json({
    status: err.status,
    error: err,
    message: err.message,
    stack: err.stack,
  });
};
const sendErrorProd = (err, res) => {
  // Operational trusted error: Send Message to the Client
  if (err.isOperational) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  }
  // Programming or other unknown error: Don't Leak error details
  else {
    // 1)Log Error
    console.error('ERROR');
    // 2)Send generic message
    res.status(500).json({
      status: 'error',
      message: 'Something went very wrong',
    });
  }
};
module.exports = (err, req, res, next) => {
  // console.log(err.stack);
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  if (process.env.NODE_ENV === 'development') {
    sendErrorDev(err, res);
  } else if (process.env.NODE_ENV === 'production') {
    if (err.name === 'CastError') {
      error = handleCastErrorDB(err);
      sendErrorProd(error, res);
    } else if (err.code === 11000) {
      error = handleDuplicateFieldsDB(err);
      sendErrorProd(error, res);
    } else if (err.name === 'ValidationError') {
      error = handleValidationErrorDB(err);
      sendErrorProd(error, res);
    } else if (err.name === 'JsonWebTokenError') {
      error = handleJWTError(err);
      sendErrorProd(error, res);
    } else if (err.name === 'TokenExpiredError') {
      error = handleJWTExpiredError(err);
      sendErrorProd(error, res);
    } else sendErrorProd(err, res);
  }
  next();
};
