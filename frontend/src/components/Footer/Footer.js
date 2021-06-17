import React from "react";
import "./Footer.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTwitter,
  faLinkedin,
  faGithub,
} from "@fortawesome/free-brands-svg-icons";
import { faCopyright } from "@fortawesome/free-solid-svg-icons";

const Footer = () => {
  return (
    <div className="footer-container">
      <div className="item1">Code_To_Thrive</div>

      <div className="item2">
        <span style={{ paddingRight: 5 }}>Copyright </span>
        <FontAwesomeIcon icon={faCopyright} />{" "}
        <span style={{ paddingLeft: 5 }}>
          {new Date().getFullYear()} Sarthak Shukla.
        </span>
      </div>
      <a href="https://github.com/sarthak-2019" className="item3">
        <FontAwesomeIcon icon={faGithub} />
      </a>
      <a
        href="https://www.linkedin.com/in/sarthak-shukla-9983351b4/"
        className="item4"
      >
        <FontAwesomeIcon icon={faLinkedin} />
      </a>
      <a href="https://twitter.com/Sarthak76642894" className="item5">
        <FontAwesomeIcon icon={faTwitter} />
      </a>
    </div>
  );
};

export default Footer;
