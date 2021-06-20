const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const morgan = require('morgan');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const globalErrorHandler = require('./controller/errorController');
const app = express();

app.use(morgan('dev'));
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: [
      'http://localhost:3000',
      'https://mern-budget-bytes.herokuapp.com',
      'https://code-to-thrive.netlify.app',
    ],
    credentials: true,
  })
);
// Set Security Http Headers
app.use(helmet());
// Data sanitization against NoSQL query injection
app.use(mongoSanitize());

// Data sanitization against XSS
// Clean user input from html and js code
app.use(xss());
//   Set up the routes

app.use('/auth', require('./routers/userRouter'));
app.use('/expense', require('./routers/expenseRouter'));

app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this Server!`, 404));
});

// Global Error Handling Middleware
app.use(globalErrorHandler);

module.exports = app;
