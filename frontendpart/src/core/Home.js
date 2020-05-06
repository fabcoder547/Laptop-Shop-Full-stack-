import React from "react";
import { API } from "../backend";
import Base from "./Base";
const Home = ({ history }) => {
  console.log(history);
  return (
    <Base>
      <div className="row">
        <div className="col-md-4">
          <button className="btn btn-primary btn-lg">click me</button>
        </div>
        <div className="col-md-4">
          <button className="btn btn-primary btn-lg">click me</button>
        </div>
        <div className="col-md-4">
          <button className="btn btn-primary btn-lg">click me</button>
        </div>
      </div>
      <div className="row">
        <div className="col-md-4">
          <button className="btn btn-primary btn-lg">click me2</button>
        </div>
        <div className="col-md-4">
          <button className="btn btn-primary btn-lg">click me2</button>
        </div>
        <div className="col-md-4">
          <button className="btn btn-primary btn-lg">click me2</button>
        </div>
      </div>
    </Base>
  );
};

export default Home;
