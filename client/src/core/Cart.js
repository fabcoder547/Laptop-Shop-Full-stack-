import React, { useState, useEffect } from "react";
import { API } from "../backend";
import Base from "./Base";
import Card from "./Card";
import { loadCart } from "./helper/cartHelper";
import StripeCheckout from "./stripeCheckout";

import Loader from "./Loader";

const Home = ({ history }) => {
  const [products, setProducts] = useState([]);
  const [reload, setReload] = useState(false);
  const [loading, setloading] = useState(false);
  useEffect(() => {
    setProducts(loadCart());
  }, [reload]);

  const loadProducts = () => {
    return (
      <div className="cart-produts">
        <h4 className="card-header bg-dark text-white">
          Laptops added in Cart
        </h4>
        {products.length != 0 ? (
          products.map((product, index) => {
            return (
              <Card
                key={index}
                product={product}
                addToCart={false}
                removeFromCart={true}
                reload={reload}
                setReload={setReload}
              ></Card>
            );
          })
        ) : (
          <h5 className="text-danger">No Laptops in your Cart!</h5>
        )}
      </div>
    );
  };
  const loadcheckout = () => {
    return (
      <div>
        <h2>This section is load checkout</h2>
      </div>
    );
  };

  const loadingMessage = () => {
    if (loading) {
      return <Loader />;
    }
  };
  return (
    <Base title="cart Page" description="All you want is here!">
      {loadingMessage()}
      <div className="row" style={{ width: "100%", textAlign: "center" }}>
        <h4
          style={{ margin: "20px auto", width: "100%" }}
          className=" text-white bg-dark cart-header"
        >
          All Products
        </h4>
        <div className="row">
          <div className="col-md-6">{loadProducts()}</div>
          <div className="col-md-6">
            <StripeCheckout
              products={products}
              reload={reload}
              setReload={setReload}
              loading={loading}
              setloading={setloading}
            />
          </div>
        </div>
      </div>
    </Base>
  );
};

export default Home;
