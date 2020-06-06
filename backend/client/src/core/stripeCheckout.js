import React, { useState, useEffect } from "react";
import { isAuthenticated } from "../auth/helper";
import { loadCart, cartEmpty } from "./helper/cartHelper";
import { Link } from "react-router-dom";
import StripeCheckoutButton from "react-stripe-checkout";
import { API } from "../backend";
import { createOrder } from "./helper/orederHelper";

const StripeCheckout = ({
  products,
  reload = undefined,
  setReload = (f) => f,
}) => {
  const tokenm = isAuthenticated().token;
  const user = isAuthenticated().user;

  const [data, setData] = useState({
    loading: false,
    success: false,
    error: "",
    address: "",
  });

  const getFinalAmount = () => {
    let amount = 0;
    products.map((product) => {
      amount = amount + product.price;
    });

    return amount;
  };

  const makeMypayment = (token) => {
    console.log(token);
    const body = {
      token,
      products,
    };
    const headers = {
      "Content-Type": "application/json",
    };

    return fetch(`${API}/stripepayment`, {
      method: "POST",
      headers: headers,
      body: JSON.stringify(body),
    })
      .then((response) => {
        console.log("Response", response);

        const orderData = {
          orders: products,
          address: token.card.address_city,
        };
        setData({ ...data, loading: true, success: false });
        createOrder(user._id, tokenm, orderData)
          .then((res) => {
            console.log("response", res);
            setData({ ...data, loading: false, success: true });
          })
          .catch((err) => {
            console.log(err);
          });
        cartEmpty(() => {
          console.log("done");
          // setData({
          //   ...data,
          //   success: false,
          // });
        });
        setReload(!reload);
      })
      .catch((err) => {
        console.log("hello");
        console.log(err);
      });
  };
  const showStripeButton = () => {
    return isAuthenticated() ? (
      <StripeCheckoutButton
        token={makeMypayment}
        name="Pay Here"
        stripeKey="pk_test_GAIftZRfkg3D2SuN0AE2h8LF00utQ9v2To"
        amount={getFinalAmount() * 0.1}
        shippingAddress
        billingAddress
      >
        <button className="btn btn-success mt-2">Pay with Stripe</button>
      </StripeCheckoutButton>
    ) : (
      <Link to="/signin">
        <button className="btn btn-warning">Signin</button>
      </Link>
    );
  };

  const successMessage = () => {
    if (data.success) {
      return (
        <div className="row">
          <div className="col-md-12 bg-success my-4">
            <h5 className="text-white">Order successful!</h5>
          </div>
        </div>
      );
    }
  };

  const loadingMessage = () => {
    if (data.loading) {
      return (
        <div className="row">
          <div className="col-md-12 bg-danger my-4">
            <h5 className="text-white">loading...</h5>
          </div>
        </div>
      );
    }
  };
  return (
    <div>
      <h4 className="card-header  bg-dark text-white">
        Your Bill <span className="text-danger">{getFinalAmount()}</span>
      </h4>
      {showStripeButton()}
      {successMessage()}
      {loadingMessage()}
    </div>
  );
};
export default StripeCheckout;
