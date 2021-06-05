import React, { useState } from "react";
import { Link } from "react-router-dom";
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
        <p className="footer-title">
          Hello,I am Atharv Joshi. This is my peronal project
        </p>
        <p className="footer-desc">
          If You have any questions feel free to ask. View my profile below.
        </p>
        <div
          style={{
            display: "flex",

            width: "90%",
            margin: "auto",
            display: "flex",
            justifyContent: "space-around",
          }}
        >
          <a
            target="blank"
            href="https://www.linkedin.com/in/atharvjoshi8149"
            className="btn btn-primary btn-lg"
            style={{
              background: "blue",
              padding: "7px 60px",
              borderRadius: "5px",
              border: "none",
              marginLeft: "0",
            }}
          >
            <h6 style={{ fontSize: "25px" }}>
              <i class="fa fa-linkedin"></i> Linkedin
            </h6>
          </a>
          <a
            target="blank"
            href="https://github.com/fabcoder547/"
            className="btn btn-primary btn-lg"
            style={{
              background: "brown",
              padding: "7px 60px",
              borderRadius: "5px",
              border: "none",
              marginRight: "0",
            }}
          >
            <h6 style={{ fontSize: "25px" }}>
              <i class="fa fa-github"></i> Github
            </h6>
          </a>
        </div>
      </div>
    </div>
  );
};
export default Base;
