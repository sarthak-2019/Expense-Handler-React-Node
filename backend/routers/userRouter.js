const router = require('express').Router();
const User = require('../models/userModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const authController = require('./../controller/authController');

// register
router.post('/signup', authController.signUp);
router.post('/login', authController.login);

router.get('/logout', (req, res) => {
  res.clearCookie('jwt');
  res.status(200).json({
    data: 'User Logged out Successfully',
  });
});

router.get('/loggedIn', (req, res) => {
  try {
    const token = req.cookies.jwt;
    if (!token) return res.json(false);

    jwt.verify(token, process.env.JWT_SECRET);

    res.send(true);
  } catch (err) {
    res.json(false);
  }
});

module.exports = router;
