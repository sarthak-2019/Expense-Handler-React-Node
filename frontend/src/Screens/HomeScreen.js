import React, { useState } from "react";
import "./HomeScreen.css";

const buttonHandler1 = () => {
  let box = document.getElementById("container");
  box.classList.remove("right-panel-active");
};
const buttonHandler2 = () => {
  let box = document.getElementById("container");
  box.classList.add("right-panel-active");
};

const HomeScreen = () => {
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

  const submitHandler_SignUp = (event) => {
    event.preventDefault();

    const userData = {
      name: enteredName,
      email: enteredEmail,
      password: enteredPassword,
      confirmPassword: enteredConfirmPassword,
    };
    console.log(userData);

    setEnteredName("");
    setEnteredEmail("");
    setEnteredPassword("");
    setEnteredConfirmPassword("");

    if (userData.password !== userData.confirmPassword) {
      alert("Password and Confirm Password doesn't match.Try Again! ");
    }
  };

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
            />
            <input
              type="email"
              placeholder="Email"
              value={enteredEmail}
              onChange={emailChangeHandler}
            />
            <input
              type="password"
              placeholder="Password"
              value={enteredPassword}
              onChange={passwordChangeHandler}
            />
            <input
              type="password"
              placeholder="Confirm Password"
              value={enteredConfirmPassword}
              onChange={confirmPasswordChangeHandler}
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
