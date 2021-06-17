import React, { useState } from "react";
import "./HomeScreen.css";
const axios = require("axios");
const HomeScreen = () => {
  const buttonHandler1 = () => {
    let box = document.getElementById("container");
    box.classList.remove("right-panel-active");
  };
  const buttonHandler2 = () => {
    let box = document.getElementById("container");
    box.classList.add("right-panel-active");
  };
  const [enteredName, setEnteredName] = useState("");
  const [enteredEmail, setEnteredEmail] = useState("");
  const [enteredPassword, setEnteredPassword] = useState("");
  const [enteredConfirmPassword, setEnteredConfirmPassword] = useState("");

  const nameChangeHandler = (event) => {
    setEnteredName(event.target.value);
  };

  const emailChangeHandler = (event) => {
    setEnteredEmail(event.target.value);
  };

  const passwordChangeHandler = (event) => {
    setEnteredPassword(event.target.value);
  };

  const confirmPasswordChangeHandler = (event) => {
    setEnteredConfirmPassword(event.target.value);
  };

  async function submitHandler_SignUp(event) {
    event.preventDefault();

    try {
      const userData = {
        name: enteredName,
        email: enteredEmail,
        password: enteredPassword,
        passwordConfirm: enteredConfirmPassword,
      };
      console.log(userData);
      await axios.post("http://127.0.0.1:8000/api/v1/users/signup", userData);
    } catch (err) {
      console.log(err);
    }
  }

  const [userName, setUserName] = useState("");
  const [userPassword, setUserPassword] = useState("");

  const userNameChangeHandler = (event) => {
    setUserName(event.target.value);
  };

  const userPasswordChangeHandler = (event) => {
    setUserPassword(event.target.value);
  };

  const submitHandler_SignIn = (event) => {
    event.preventDefault();

    const userData = {
      name: userName,
      password: userPassword,
    };
    console.log(userData);

    setUserName("");
    setUserPassword("");
  };
  return (
    <div class="main-body">
      <h1>Welcome To Expense Handler App</h1>
      <div class="container" id="container">
        <div class="form-container sign-up-container">
          <form onSubmit={submitHandler_SignUp}>
            <h1>Create Account</h1>
            <span>or use your email for registration</span>
            <input
              type="text"
              placeholder="Name"
              value={enteredName}
              onChange={nameChangeHandler}
              required
            />
            <input
              type="email"
              placeholder="Email"
              value={enteredEmail}
              onChange={emailChangeHandler}
              required
            />
            <input
              type="password"
              minLength="4"
              placeholder="Password"
              value={enteredPassword}
              onChange={passwordChangeHandler}
              required
            />
            <input
              type="password"
              minLength="4"
              placeholder="Confirm Password"
              value={enteredConfirmPassword}
              onChange={confirmPasswordChangeHandler}
              required
            />
            <button>Sign Up</button>
          </form>
        </div>
        <div class="form-container sign-in-container">
          <form onSubmit={submitHandler_SignIn}>
            <h1>Sign in</h1>
            <span>or use your account</span>
            <input
              type="email"
              placeholder="Email"
              value={userName}
              onChange={userNameChangeHandler}
            />
            <input
              type="password"
              placeholder="Password"
              value={userPassword}
              onChange={userPasswordChangeHandler}
            />
            <button>Sign In</button>
          </form>
        </div>
        <div class="overlay-container">
          <div class="overlay">
            <div class="overlay-panel overlay-left">
              <h1>Welcome Back!</h1>
              <p>To keep connected please login with your personal info</p>
              <button class="ghost" id="signIn" onClick={buttonHandler1}>
                Sign In
              </button>
            </div>
            <div class="overlay-panel overlay-right">
              <h1>Hello !</h1>
              <p>
                Sign Up for start using the service. Hope you will like the
                experience.Visit my Github repository for more interesting
                projects.
              </p>
              <button class="ghost" id="signUp" onClick={buttonHandler2}>
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default HomeScreen;
