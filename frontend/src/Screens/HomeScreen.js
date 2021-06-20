import React, { useState, useContext } from "react";
import "./HomeScreen.css";
import AuthContext from "../context/AuthContext";
import { useHistory } from "react-router-dom";
import Particle from "../components/Particles/Particle";
import axios from "axios";

const HomeScreen = () => {
  const { getLoggedIn } = useContext(AuthContext);
  const history = useHistory();

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
        passwordVerify: enteredConfirmPassword,
      };
      await axios.post(
        "https://mern-budget-bytes.herokuapp.com/auth/signup",
        userData
      );
      await getLoggedIn();
      history.push("/main");
    } catch (err) {
      alert(err.response.data.message);
      console.log(err);
    }
  }

  const [userEmail, setUserName] = useState("");
  const [userPassword, setUserPassword] = useState("");

  const userNameChangeHandler = (event) => {
    setUserName(event.target.value);
  };

  const userPasswordChangeHandler = (event) => {
    setUserPassword(event.target.value);
  };

  async function submitHandler_SignIn(event) {
    event.preventDefault();

    try {
      const userData = {
        email: userEmail,
        password: userPassword,
      };
      await axios.post(
        "https://mern-budget-bytes.herokuapp.com/auth/login",
        userData
      );
      await getLoggedIn();

      history.push("/main");
    } catch (err) {
      alert(err.response.data.message);
      console.log(err);
    }

    // setUserName("");
    // setUserPassword("");
  }
  return (
    <div>
      <Particle />
      <div className="main-body">
        <h1>Welcome To Expense Handler App</h1>
        <div className="container" id="container">
          <div className="form-container sign-up-container">
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
          <div className="form-container sign-in-container">
            <form onSubmit={submitHandler_SignIn}>
              <h1>Sign in</h1>
              <span>or use your account</span>
              <input
                type="email"
                placeholder="Email"
                value={userEmail}
                onChange={userNameChangeHandler}
                required
              />
              <input
                type="password"
                placeholder="Password"
                value={userPassword}
                onChange={userPasswordChangeHandler}
                required
              />
              <button>Sign In</button>
            </form>
          </div>
          <div className="overlay-container">
            <div className="overlay">
              <div className="overlay-panel overlay-left">
                <h1>Welcome Back!</h1>
                <p>To keep connected please login with your personal info</p>
                <button className="ghost" id="signIn" onClick={buttonHandler1}>
                  Sign In
                </button>
              </div>
              <div className="overlay-panel overlay-right">
                <h1>Hello !</h1>
                <p>
                  Sign Up for start using the service. Hope you will like the
                  experience.Visit my Github repository for more interesting
                  projects.
                </p>
                <button className="ghost" id="signUp" onClick={buttonHandler2}>
                  Sign Up
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default HomeScreen;
