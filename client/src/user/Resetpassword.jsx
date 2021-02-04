import React, { useState } from "react";
import Base from "../core/Base";
import axios from "axios";

import { useParams, Link } from "react-router-dom";
import { API } from "../backend";
export default function Resetpassword() {
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setloading] = useState(false);
  const [passwords, setpasswords] = useState({
    password1: "",
    password2: "",
  });

  const { token } = useParams();

  const handleChange = (name) => (e) => {
    e.preventDefault();
    setpasswords({ ...passwords, [name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    setloading(true);
    if (passwords.password1 !== passwords.password2) {
      return setError("password doesnt match");
    }

    axios
      .put(`${API}/reset/password`, {
        password: passwords.password1,
        token,
      })
      .then((res) => {
        setloading(false);
        if (res.data.message) {
          setSuccess(res.data.message);
          setError(null);
        } else {
          setError("Something went wrong ! please try again");
        }
      })
      .catch((err) => {
        setloading(false);
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
              <p>Your Password has been reset successfully!</p>
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
    <Base title="Reset Password">
      {loadingmessage()}
      {successMessege()}
      {errorMessege()}
      <div>
        <form>
          <input
            onChange={handleChange("password1")}
            type="password"
            className="form-control mb-3"
            placeholder="New password"
          />

          <input
            onChange={handleChange("password2")}
            type="password"
            className="form-control mb-3"
            placeholder="Confirm new password"
          />

          <button
            onClick={onSubmit}
            className="btn btn-outline-warning rounded mb-3 form-control"
          >
            Reset
          </button>

          <Link
            className="btn btn-outline-info text-white text-decoration-none"
            to="/signin"
            style={{ width: "100%" }}
          >
            Signin
          </Link>

          <br />
        </form>
      </div>
    </Base>
  );
}
