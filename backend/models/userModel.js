const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
// Creating a schema

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please tell your name'],
  },
  email: {
    type: String,
    required: [true, 'Please tell your email'],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, 'Please provide a valid Email'],
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user',
  },
  password: {
    type: String,
    type: String,
    required: [true, 'Please provide a password'],
    minlength: 4,
    select: false,
  },
  passwordVerify: {
    type: String,
    required: [true, 'Please confirm your password'],
    validate: {
      validator: function (el) {
        return el === this.password;
      },
      message: 'Password and Confirm PAssword  do not match',
    },
  },
});

userSchema.pre('save', async function (next) {
  // If password is not modified then return from this function
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 12);
  this.passwordVerify = undefined;
  next();
});

userSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};
const User = mongoose.model('User', userSchema);
module.exports = User;
