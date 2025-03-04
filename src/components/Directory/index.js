import React from "react";
import { Link } from "react-router-dom";
import Club from "./../../assets/club.png";
import Country from "./../../assets/country.png";
import "./styles.scss";

const Directory = (props) => {
  return (
    <div className="directory">
      <div className="wrap">
        <div
          className="item"
          style={{
            backgroundImage: `url(${Club})`,
          }}
        >
          <Link to="/search/unavailable">Shop Club</Link>
        </div>
        <div
          className="item"
          style={{
            backgroundImage: `url(${Country})`,
          }}
        >
          <Link to="/search/available">Shop Country</Link>
        </div>
      </div>
    </div>
  );
};

export default Directory;
