import React from "react";
import "./styles.scss";

const Checkbox = ({ handleChange, label, ...otherProps }) => {
  const [checked, setChecked] = React.useState(false);

  const handleCheckboxChange = (e) => {
    setChecked(e.target.checked);
    handleChange(e.target.checked);
  };

  return (
    <div className="formRowCheckBox">
      <input
        type="checkbox"
        className="checkBox"
        onChange={handleCheckboxChange}
        {...otherProps}
      />
      {label && <label for="checkBox">{label}</label>}
    </div>
  );
};

export default Checkbox;
