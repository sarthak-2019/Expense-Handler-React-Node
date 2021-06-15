import React from "react";

import "./Header.css";

const res = "You are Logged in as ";
const Header = () => {
  return (
    <div className="main">
      <div>
        <h3>
          {res}
          <i class="far fa-grin"> </i>
        </h3>
      </div>
      <div>Name: Sarthak Shukla Emailid: shuklasarthak100@gmail.com</div>
    </div>
  );
};
export default Header;
