import React, { useContext, useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import classes from "./Header.module.css";
import AuthContext from "./../../context/AuthContext";

const Header = () => {
  const [userName, setUSerName] = useState("User Name");
  const { getLoggedIn } = useContext(AuthContext);
  const history = useHistory();

  async function getUserName() {
    const userData = await axios.get("http://localhost:5000/expense/user");
    setUSerName(userData.data.data.name);
  }
  useEffect(() => {
    getUserName();
  }, []);
  async function logOut() {
    await axios.get("http://localhost:5000/auth/logout");
    await getLoggedIn();
    history.push("/");
  }

  return (
    <React.Fragment>
      <div className={classes.header}>
        <h3>Hi! {userName}</h3>
        <button className="button-item" onClick={logOut}>
          Log Out
        </button>
      </div>
    </React.Fragment>
  );
};

export default Header;
