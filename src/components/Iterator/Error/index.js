import React from "react";
import "./styles.scss";

const Errors = ({ errors, ...otherProps }) => {
  if (errors.length > 0) {
    return (
      <div className="errors">
        <h4>
          <strong>May suka! (UH OH!).</strong>
        </h4>
        <ul>
          {errors.forEach((error) => {
            <li>{error}</li>;
          })}
        </ul>
      </div>
    );
  }
  return "";
};

export default Errors;
