import React, { useContext, useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import classes from "./Header.module.css";
import AuthContext from "./../../context/AuthContext";
import logo from "./icon.png";
const Header = () => {
  const [userName, setUSerName] = useState("User Name");
  const { getLoggedIn } = useContext(AuthContext);
  const history = useHistory();

  async function getUserName() {
    const userData = await axios.get(
      "https://mern-budget-bytes.herokuapp.com/expense/user"
    );
    setUSerName(userData.data.data.name);
  }
  useEffect(() => {
    getUserName();
  }, []);
  async function logOut() {
    await axios.get("https://mern-budget-bytes.herokuapp.com/auth/logout");
    await getLoggedIn();
    history.push("/");
  }

  return (
    <React.Fragment>
      <div className={classes.header}>
        <img src={logo} alt="" height={50} width={50} />
        <h3>Hi! {userName}</h3>
        <button className="button-item" onClick={logOut}>
          Log Out
        </button>
      </div>
    </React.Fragment>
  );
};

export default Header;
