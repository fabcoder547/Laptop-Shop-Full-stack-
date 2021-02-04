import React, { useState } from "react";
import Base from "../core/Base";
import axios from "axios";
import { API } from "../backend";
import Loader from "react-spinners/BounceLoader";

export default function Forgetpassword() {
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);
  const [email, setEmail] = useState("");
  const [loading, setloading] = useState(false);

  const handleChange = (e) => {
    setEmail(e.target.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    setloading(true);
    axios
      .post(`${API}/forget/password`, { email })
      .then((res) => {
        setloading(false);

        if (res.data.message) {
          setSuccess(true);
          setError(null);
        } else {
          setError(res.data.err);
        }
      })
      .catch((err) => {
        setloading(false);

        setSuccess(false);
        if (err.response.data) {
          setError(err.response.data.err);
        } else {
          setError("Network Error!");
        }
      });
  };

  const errorMessege = () => {
    return (
      error && (
        <div className="row" style={{ width: "100%" }}>
          <div className="col-md-12" style={{ width: "100%" }}>
            <div className="alert alert-danger" style={{ width: "100%" }}>
              <p>{error} here</p>
            </div>
          </div>
        </div>
      )
    );
  };

  const successMessege = () => {
    if (success) {
      return (
        <div className="row" style={{ width: "100%" }}>
          <div className="col-md-12" style={{ width: "100%" }}>
            <div className="alert alert-success" style={{ width: "100%" }}>
              <p>Email Sent Successflly!</p>
            </div>
          </div>
        </div>
      );
    }
  };

  const loadingmessage = () => {
    if (loading) {
      return (
        <div className="row" style={{ width: "100%" }}>
          <div className="col-md-12" style={{ width: "100%" }}>
            <div className="alert alert-success" style={{ width: "100%" }}>
              <p>loading...</p>
            </div>
          </div>
        </div>
      );
    }
  };

  return (
    <Base
      title="Forgot password?"
      description="Enter your email address to reset your password."
    >
      {loadingmessage()}
      {successMessege()}
      {errorMessege()}
      <form>
        <input
          type="email"
          className="form-control mb-3"
          placeholder="Enter your Email"
          onChange={handleChange}
        />
        <button
          onClick={onSubmit}
          className=" form-control btn btn-outline-warning rounded  text-white"
        >
          Send Email
        </button>
      </form>
    </Base>
  );
}
