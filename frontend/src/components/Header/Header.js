import React from "react";
import classes from "./Header.module.css";
const Header = () => {
  return (
    <React.Fragment>
      <div className={classes.header}>
        <h1>Hi Sarthak!</h1>
        <button class="button-item">Log Out</button>
      </div>
    </React.Fragment>
  );
};

export default Header;
