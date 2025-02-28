import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import React, { useEffect, useState } from "react";
import { CountryDropdown } from "react-country-region-selector";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { createStructuredSelector } from "reselect";
import {
  selectCartItems,
  selectCartItemsCount,
  selectCartTotal,
} from "../../redux/Cart/cart.selectors";
import { saveOrderHistory } from "../../redux/Orders/orders.actions";
import { apiInstance } from "../../utils";
import Button from "../Forms/Button";
import Checkbox from "../Forms/Checkbox";
import FormInput from "../Forms/FormInput";
import Errors from "../Iterator/Error";
import "./styles.scss";

const initialAddressState = {
  line1: "",
  line2: "",
  city: "",
  state: "",
  postal_code: "",
  country: "",
};

const mapState = createStructuredSelector({
  total: selectCartTotal,
  itemCount: selectCartItemsCount,
  cartItems: selectCartItems,
});

const PaymentDetails = () => {
  const stripe = useStripe();
  const elements = useElements();
  const history = useHistory();
  const { total, itemCount, cartItems } = useSelector(mapState);
  const dispatch = useDispatch();
  const [billingAddress, setBillingAddress] = useState({
    ...initialAddressState,
  });
  const [shippingAddress, setShippingAddress] = useState({
    ...initialAddressState,
  });
  const [recipientName, setRecipientName] = useState("");
  const [nameOnCard, setNameOnCard] = useState("");
  const [cartErrors, setErrors] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const singleAddressMessage =
    "Billing address is the same as shipping address.";

  useEffect(() => {
    if (itemCount < 1) history.push("/dashboard");
  }, [itemCount]);

  const handleShipping = (e) => {
    const { name, value } = e.target;

    setShippingAddress({
      ...shippingAddress,
      [name]: value,
    });
  };

  const handleBilling = (e) => {
    const { name, value } = e.target;

    setBillingAddress({
      ...billingAddress,
      [name]: value,
    });
  };

  const toggleBillingAddress = (flag) => {
    if (flag) {
      setBillingAddress({ ...shippingAddress });
      console.log(billingAddress);
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    if (cartErrors.length > 1) setErrors([]);

    const cardElement = elements.getElement("card");

    // bar empty shipping address elements

    if (
      !shippingAddress.line1 ||
      !shippingAddress.city ||
      !shippingAddress.state ||
      !shippingAddress.postal_code ||
      !shippingAddress.country ||
      !billingAddress.line1 ||
      !billingAddress.city ||
      !billingAddress.state ||
      !billingAddress.postal_code ||
      !billingAddress.country ||
      !recipientName ||
      !nameOnCard
    ) {
      return;
    }

    setIsSubmitting(true);

    apiInstance
      .post("/payments/create", {
        amount: total.toFixed(0) * 100,
        shipping: {
          name: recipientName,
          address: {
            ...shippingAddress,
          },
        },
      })
      .then(({ data: clientSecret }) => {
        stripe
          .createPaymentMethod({
            type: "card",
            card: cardElement,
            billing_details: {
              name: nameOnCard,
              address: {
                ...billingAddress,
              },
            },
          })
          .then(({ paymentMethod }) => {
            stripe
              .confirmCardPayment(clientSecret, {
                payment_method: paymentMethod.id,
              })
              .then(({ paymentIntent }) => {
                const configOrder = {
                  orderTotal: total,
                  orderItems: cartItems.map((item) => {
                    const {
                      documentID,
                      productThumbnail,
                      productName,
                      productPrice,
                      quantity,
                    } = item;

                    return {
                      documentID,
                      productThumbnail,
                      productName,
                      productPrice,
                      quantity,
                    };
                  }),
                };
                dispatch(saveOrderHistory(configOrder));
                // dispatch(clearCart());
              });
          });
      })
      .catch((err) => {
        setErrors([
          "The following item/s is now unavailable or the payment is experiencing issue. Please remove item/s from the cart or try again later.",
        ]);
      })
      .finally(() => setIsSubmitting(false));
  };

  const configCardElement = {
    iconStyle: "solid",
    style: {
      base: {
        fontSize: "16px",
      },
    },
    hidePostalCode: true,
  };

  return (
    <div className="paymentDetails">
      <form onSubmit={handleFormSubmit}>
        <div className="group">
          <Errors errors={cartErrors} />

          <h2>Shipping Address</h2>

          <FormInput
            required
            placeholder="Recipient Name"
            name="recipientName"
            handleChange={(e) => setRecipientName(e.target.value)}
            value={recipientName}
            type="text"
          />

          <FormInput
            required
            placeholder="Line 1"
            name="line1"
            handleChange={(e) => handleShipping(e)}
            value={shippingAddress.line1}
            type="text"
          />

          <FormInput
            placeholder="Line 2"
            name="line2"
            handleChange={(e) => handleShipping(e)}
            value={shippingAddress.line2}
            type="text"
          />

          <FormInput
            required
            placeholder="City"
            name="city"
            handleChange={(e) => handleShipping(e)}
            value={shippingAddress.city}
            type="text"
          />

          <FormInput
            required
            placeholder="State"
            name="state"
            handleChange={(e) => handleShipping(e)}
            value={shippingAddress.state}
            type="text"
          />

          <FormInput
            required
            placeholder="Postal Code"
            name="postal_code"
            handleChange={(e) => handleShipping(e)}
            value={shippingAddress.postal_code}
            type="text"
          />

          <div className="formRow checkoutInput">
            <CountryDropdown
              required
              onChange={(val) =>
                handleShipping({
                  target: {
                    name: "country",
                    value: val,
                  },
                })
              }
              value={shippingAddress.country}
              valueType="short"
            />
          </div>

          <Checkbox
            label={singleAddressMessage}
            handleChange={toggleBillingAddress}
          />
        </div>

        <div className="group">
          <h2>Billing Address</h2>

          <FormInput
            required
            placeholder="Name on Card"
            name="nameOnCard"
            handleChange={(e) => setNameOnCard(e.target.value)}
            value={nameOnCard}
            type="text"
          />

          <FormInput
            required
            placeholder="Line 1"
            name="line1"
            handleChange={(e) => handleBilling(e)}
            value={billingAddress.line1}
            type="text"
          />

          <FormInput
            placeholder="Line 2"
            name="line2"
            handleChange={(e) => handleBilling(e)}
            value={billingAddress.line2}
            type="text"
          />

          <FormInput
            required
            placeholder="City"
            name="city"
            handleChange={(e) => handleBilling(e)}
            value={billingAddress.city}
            type="text"
          />

          <FormInput
            required
            placeholder="State"
            name="state"
            handleChange={(e) => handleBilling(e)}
            value={billingAddress.state}
            type="text"
          />

          <FormInput
            required
            placeholder="Postal Code"
            name="postal_code"
            handleChange={(e) => handleBilling(e)}
            value={billingAddress.postal_code}
            type="text"
          />

          <div className="formRow checkoutInput">
            <CountryDropdown
              required
              onChange={(val) =>
                handleBilling({
                  target: {
                    name: "country",
                    value: val,
                  },
                })
              }
              value={billingAddress.country}
              valueType="short"
            />
          </div>
        </div>

        <div className="group">
          <h2>Card Details</h2>

          <CardElement options={configCardElement} />
        </div>

        <Button type="submit" disabled={isSubmitting}>
          Pay Now
        </Button>
      </form>
    </div>
  );
};
export default PaymentDetails;
