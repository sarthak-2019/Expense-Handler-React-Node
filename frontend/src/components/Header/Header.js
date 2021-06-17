import React from "react";
import classes from "./Header.module.css";
import { Link } from "react-router-dom";
const Header = () => {
  return (
    <React.Fragment>
      <div className={classes.header}>
        <h1>Hi Sarthak!</h1>
        <Link to="/">
          <button className="button-item">Log Out</button>
        </Link>
      </div>
    </React.Fragment>
  );
};

export default Header;
