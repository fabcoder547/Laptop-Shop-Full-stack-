import React, { useState, useEffect } from "react";
import { API } from "../backend";
import Base from "./Base";
import Card from "./Card";
import { loadCart } from "./helper/cartHelper";
import StripeCheckout from "./stripeCheckout";

const Home = ({ history }) => {
  const [products, setProducts] = useState([]);
  const [reload, setReload] = useState(false);
  useEffect(() => {
    setProducts(loadCart());
  }, [reload]);

  const loadProducts = () => {
    return (
      <div>
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
          <h3 className="text-danger">No Laptops</h3>
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
  return (
    <Base title="cart Page" description="All you want is here!">
      <div className="row" style={{ width: "100%", textAlign: "center" }}>
        <h3
          style={{ margin: "20px auto", width: "100%" }}
          className=" text-white bg-dark"
        >
          ALL PRODUCTS
        </h3>
        <div className="row">
          <div className="col-md-6">{loadProducts()}</div>
          <div className="col-md-6">
            <StripeCheckout
              products={products}
              reload={reload}
              setReload={setReload}
            />
          </div>
        </div>
      </div>
    </Base>
  );
};

export default Home;
