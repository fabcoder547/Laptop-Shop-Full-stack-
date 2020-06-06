import React from "react";
import { API } from "../../backend";

const Image = ({ product }) => {
  const imageUrl = product
    ? `${API}/product/photo/${product._id}`
    : " https://images.pexels.com/photos/3290068/pexels-photo-3290068.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500";
  return (
    <div className="rounded border border-success p-2">
      <img
        src={imageUrl}
        style={{ width: "250px", height: "200px" }}
        className="mb-3 rounded img-fluid"
      />
    </div>
  );
};

export default Image;
