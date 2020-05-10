import React, { useState, useEffect } from "react";
import { API } from "../backend";
import Base from "./Base";
import Card from "./Card";
import { getAllProducts } from "../admin/helper/adminapicall";

const Home = ({ history }) => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(false);

  const preload = () => {
    getAllProducts()
      .then((data) => {
        if (data.error) {
          setError(data.error);
        } else {
          setProducts(data.products);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    preload();
  }, []);
  return (
    <Base>
      <div className="row">
        <h1>ALL PRODUCTS</h1>
        <div className="row">
          {products.map((product, index) => (
            <Card key={index} product={product} />
          ))}
        </div>
      </div>
    </Base>
  );
};

export default Home;
