// import React from "react";
// import Navbar from "./Navbar";
// const Base = ({
//   title = "My Title",
//   description = "my description",
//   className = "bg-dark text-white p-4",
//   children,
// }) => {
//   return (
//     <div>
//       <Navbar />
//       <div className="container-fluid">
//         <div className="jumbotron bg-dark text-white text-center">
//           <h2>{title}</h2>
//           <p className="lead">{description}</p>
//         </div>

//         <div className={className}>{children}</div>
//       </div>
//       <footer className="footer bg-dark mt-auto py-3">
//         <div className="container-fluid text-center text-white">
//           <h4>if u got any questions feel free to ask </h4>
//           <button className="btn btn-success btn-lg ">contsct us</button>
//         </div>
//         <div className="container text-center">
//           <span className="text-muted">Amazing Laptop shop</span>
//         </div>
//       </footer>
//     </div>
//   );
// };

// export default Base;

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
      <div className="landinng-div">
        <p className="landing-title">{title}</p>
        <p className="descripiton">{description}</p>
      </div>

      <div className="container-fluid text-center main-content">{children}</div>

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
