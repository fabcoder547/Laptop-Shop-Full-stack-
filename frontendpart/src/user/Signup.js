import React, { useState } from "react";
import Base from "../core/Base";
import { Link } from "react-router-dom";

const Signup = () => {
  return (
    <Base title="Signup page">
      <form>
        <input type="text" placeholder="Enter Email" />
        <input type="password" placeholder="password" />
      </form>
    </Base>
  );
};

export default Signup;
