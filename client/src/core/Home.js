import React, { useState, useEffect } from "react";
import { API } from "../backend";
import Base from "./Base";
import Card from "./Card";
import {
  getAllProducts,
  getAllProductswithQuery,
} from "../admin/helper/adminapicall";

const Home = ({ history }) => {
  const [query, setQuery] = useState("");
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(false);
  const [reload, setReload] = useState(false);
  const preload = (queryString) => {
    setReload(!reload);
    console.log(queryString);
    getAllProductswithQuery(queryString)
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
    preload(query);
  }, [query]);

  const handelChange = (e) => {
    console.log(e.target.value);
    setQuery(e.target.value);
  };

  return (
    <Base title="Home Page" description="All you want is here!">
      <div className="row ">
        <select
          onChange={handelChange}
          defaultValue="price"
          className="form-control mt-3 mb-2 sort"
          style={{ width: "100%", float: "left", color: "#fff" }}
        >
          <option value="_id">Id</option>
          <option value="price">price</option>
          <option value="name">name</option>
        </select>
        <br />
      </div>
      <div className="row" style={{ width: "100%", textAlign: "center" }}>
        <div
          style={{ width: "100%", padding: "5px" }}
          className=" bg-dark home-header"
        >
          <h4
            style={{
              margin: "20px auto",
              padding: "5px",

              width: "60%",
            }}
            className="text-white  home-title"
          >
            <i class="fa fa-laptop"></i> ALL PRODUCTS
          </h4>
        </div>

        <div
          className="row home-main-content"
          style={{
            textAlign: "center",
          }}
        >
          {products.map((product, index) => (
            <Card key={index} product={product} />
          ))}
        </div>
      </div>
    </Base>
  );
};

export default Home;
