import React from "react";
import "./styles.scss";

const FormQuantityInput = ({
  handleChange,
  label,
  handleClickIncrease,
  handleClickDecrease,
  quantity,
  ...otherProps
}) => {
  return (
    <div class="quantity">
      <button
        className="minus"
        aria-label="Decrease"
        onClick={handleClickDecrease}
      >
        &minus;
      </button>
      <input
        type="number"
        class="input-box"
        value={quantity}
        onChange={handleChange}
      />
      <button
        className="plus"
        aria-label="Increase"
        onClick={handleClickIncrease}
      >
        +
      </button>
    </div>
  );
};

export default FormQuantityInput;
