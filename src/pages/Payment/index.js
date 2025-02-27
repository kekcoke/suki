import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import React from "react";
import { publishableKey } from "./../../stripe/config";

const stripePromise = loadStripe(publishableKey);

const Payment = () => {
  return <Elements stripe={stripePromise}></Elements>;
};

export default Payment;
