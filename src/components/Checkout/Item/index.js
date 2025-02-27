import React from "react";
import { useDispatch } from "react-redux";
import {
  addProduct,
  reduceCartItem,
  removeCartItem,
} from "../../../redux/Cart/cart.actions";
import FormQuantityInput from "../../Forms/FormQuantityInput";

const Item = (product) => {
  const dispatch = useDispatch();
  const { productName, productThumbnail, productPrice, quantity, documentID } =
    product;

  const handleRemoveCartItem = (documentID) => {
    dispatch(
      removeCartItem({
        documentID,
      })
    );
  };

  const handleAddProduct = (product) => {
    dispatch(addProduct(product));
  };

  const handleReduceItem = (product) => {
    dispatch(reduceCartItem(product));
  };

  const handleInputChange = (e) => {
    const { value } = e.target;

    if (value === undefined || value === "" || value < 1 || value === quantity)
      return;

    if (e.target.value > quantity) return handleAddProduct(product);

    return handleReduceItem(product);
  };

  return (
    <table className="cartItem" border="0" cellPadding="10" cellSpacing="0">
      <tbody>
        <tr>
          <td>
            <img src={productThumbnail} alt={productName} />
          </td>
          <td>{productName}</td>
          <td>
            <FormQuantityInput
              handleClickIncrease={() => dispatch(addProduct(product))}
              handleClickDecrease={() => dispatch(reduceCartItem(product))}
              handleChange={handleInputChange}
              quantity={quantity}
            />
          </td>
          <td>{productPrice}</td>
          <td align="center">
            <span
              className="cartBtn"
              onClick={() => handleRemoveCartItem(documentID)}
            >
              X
            </span>
          </td>
        </tr>
      </tbody>
    </table>
  );
};

export default Item;
