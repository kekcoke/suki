import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

//ordertails, getordertailsstart,

const mapState = ({ ordersData }) => ({
  orderDetails: ordersData.orderDetails,
});

const Order = () => {
  const { orderID } = useParams();
  const dispatch = useDispatch();
  const { orderDetails } = useSelector(mapState);
  const { orderTotal } = orderDetails;

  useEffect(() => {
    dispatch();
  }, []);

  return (
    <div>
      <h1> Order ID: #{orderID}</h1>
      <h3> Total: {orderTotal}</h3>
    </div>
  );
};

export default Order;
