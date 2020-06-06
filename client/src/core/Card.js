import React, { useState, useEffect } from "react";
import Image from "./helper/Image";
import {
  getBrand,
  getAllProductswithQuery,
} from "../admin/helper/adminapicall";
import { Redirect } from "react-router-dom";
import { addProductToCart, removeProductFromCart } from "./helper/cartHelper";

const Card = ({
  product,
  addToCart = true,
  removeFromCart = false,
  reload = undefined,
  setReload = undefined,
}) => {
  const [redirect, setRedirect] = useState(false);

  const RedirectUser = (redirect) => {
    if (redirect) {
      return <Redirect to="/cart" />;
    }
  };

  const addToCartOnClick = () => {
    addProductToCart(product, () => {
      setRedirect(true);
    });
  };
  const keepAddToCart = (addToCart) => {
    return (
      addToCart && (
        <button
          onClick={addToCartOnClick}
          className="btn btn-block btn-outline-success mt-2 mb-2"
        >
          Add to Cart
        </button>
      )
    );
  };
  const keepRemoveFromCart = (removeFromCart, productId) => {
    return (
      removeFromCart && (
        <button
          onClick={() => {
            removeProductFromCart(productId);
            setReload(!reload);
          }}
          className="btn btn-block btn-outline-danger mt-2 mb-2"
        >
          Remove from cart
        </button>
      )
    );
  };

  const cardTitle = product ? product.name : "A photo from pexels";
  const cardPrice = product ? product.price : "Default";
  const ram = product ? product.description.memory.ram : "none";
  const rom = product ? product.description.memory.rom : "none";
  const brand = product.description.brand
    ? product.description.brand.name
    : "Not defined";
  const display = product ? product.description?.display : "Default";

  return (
    <div className="card text-white bg-dark border border-info ">
      {RedirectUser(redirect)}
      <div className="card-header lead">{cardTitle}</div>
      <div className="card-body">
        <Image product={product} />
        <p className="lead bg-success font-weight-normal text-wrap">
          this photo looks great
        </p>
        <p className="font-weight-normaltext-wrap bg-success">Ram:{ram} gb</p>
        <p className="font-weight-normaltext-wrap bg-success">Rom:{rom} gb</p>
        <p className="font-weight-normaltext-wrap bg-success">
          Display:{display}
        </p>
        <p className="font-weight-normaltext-wrap bg-success">Rom:{rom} gb</p>
        <p className="font-weight-normaltext-wrap bg-success">
          BrandName:{brand}
        </p>
        <p className="btn btn-success rounded  btn-sm px-4">$ {cardPrice}</p>
        <div className="row">
          <div className="col-12">{keepAddToCart(addToCart)}</div>
          <div className="col-12">
            {keepRemoveFromCart(removeFromCart, product._id)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
