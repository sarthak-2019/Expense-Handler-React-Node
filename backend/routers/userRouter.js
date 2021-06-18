const router = require('express').Router();
const jwt = require('jsonwebtoken');
const authController = require('./../controller/authController');

// register
router.post('/signup', authController.signUp);
router.post('/login', authController.login);
router.get('/logout', authController.logout);
router.get('/loggedIn', authController.loggedIn);

module.exports = router;
