import React from "react";
import Image from "./helper/Image";

const Card = ({ product, addToCart = true, removeFromCart = false }) => {
  const keepAddToCart = () => {
    return (
      addToCart && (
        <button
          onClick={() => {}}
          className="btn btn-block btn-outline-success mt-2 mb-2"
        >
          Add to Cart
        </button>
      )
    );
  };
  const keepRemoveFromCart = () => {
    return (
      removeFromCart && (
        <button
          onClick={() => {}}
          className="btn btn-block btn-outline-danger mt-2 mb-2"
        >
          Remove from cart
        </button>
      )
    );
  };

  const cardTitle = product ? product.name : "A photo from pexels";
  const cardPrice = product ? product.price : "Default";
  var ram;
  //   if (product !== undefined) {
  //     ram = product.description.memory.ram;
  //   } else {
  //     ram = "Not defined";
  //   }

  const display = product ? product.description?.display : "Default";

  console.log(product);

  return (
    <div className="card text-white bg-dark border border-info ">
      <div className="card-header lead">{cardTitle}</div>
      <div className="card-body">
        <Image product={product} />
        <p className="lead bg-success font-weight-normal text-wrap">
          this photo looks great
        </p>
        <p className="font-weight-normaltext-wrap bg-success">Ram:{} gb</p>
        <p className="font-weight-normaltext-wrap bg-success">Rom:{} gb</p>
        <p className="font-weight-normaltext-wrap bg-success">
          Display:{display} gb
        </p>
        <p className="btn btn-success rounded  btn-sm px-4">$ {cardPrice}</p>
        <div className="row">
          <div className="col-12">{keepAddToCart()}</div>
          <div className="col-12">{keepRemoveFromCart()}</div>
        </div>
      </div>
    </div>
  );
};

export default Card;
