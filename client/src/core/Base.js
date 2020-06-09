import React, { useState } from "react";
import Navbar from "./Navbar";

const Base = ({
  title = "my Title",
  description = "My description",
  children,
}) => {
  return (
    <div>
      <Navbar />
      <div className="row" style={{ width: "100%" }}>
        <div className="landinng-div ">
          <p className="landing-title text-white">
            {" "}
            <i class="fa fa-laptop"></i> {title}
          </p>
          <p className="descripiton">{description}</p>
        </div>
      </div>

      <div className="container my-5 text-center main-content">{children}</div>

      <div className="myfooter">
        <p className="footer-title">Laptop shop</p>
        <p className="footer-desc">
          If You have any questions feel free to ask{" "}
        </p>
        <button className="btn btn-success btn -lg">Contact Us</button>
      </div>
    </div>
  );
};
export default Base;
