import React, { useState } from "react";
import Base from "../core/Base";

import { Link, Redirect } from "react-router-dom";

import { authenticate, isAuthenticated, signin } from "../auth/helper";
const Signin = ({ history, location }) => {
  // console.log(nest);
  console.log(history.location);
  console.log(location.pathname);
  const [values, setValues] = useState({
    email: "atharvjoshi547@gmail.com",
    password: "atharv123",
    error: "",
    success: false,
    isRedirected: false,
    loading: false,
  });

  const { email, password, isRedirected, loading, error, success } = values;

  const handelChange = (name) => (e) => {
    setValues({ ...values, error: false, [name]: e.target.value });
  };
  const { user } = isAuthenticated();
  const onsubmit = (e) => {
    e.preventDefault();
    // TODO:set state here as well
    setValues({ ...values, isRedirected: false, error: false, loading: true });
    signin({ email, password })
      .then((data) => {
        if (data.err) {
          alert("signin failed!try again");
          setValues({
            ...values,
            error: data.err,
            loading: false,
            success: false,
          });
        } else if (data.errors) {
          alert("signin failed!try again");
          setValues({
            ...values,
            error: data.errors.errors[0].msg,
            success: false,
            loading: false,
          });
        } else {
          authenticate(data, () => {
            alert("Signup successfully!");
            setValues({
              ...values,
              email: "",
              password: "",
              success: true,
              error: "",
              loading: false,
              isRedirected: true,
            });
          });
        }
      })
      .catch();
  };

  const Redirectuser = () => {
    if (isRedirected) {
      if (user && user.role === 1) {
        return <Redirect to="/admin/dashboard" />;
      } else {
        return <Redirect to="/user/dashboard" />;
      }
    }

    if (isAuthenticated()) {
      console.log(isRedirected + "is this");
      return <Redirect to="/" />;
    }
  };
  const loadingMessege = () => {
    return (
      <div className="row" style={{ width: "100%" }}>
        <div className="col-md-12" style={{ width: "100%" }}>
          <div
            className="alert alert-success"
            style={{
              display: loading ? "" : "none",
              width: "100%",
            }}
          >
            <p>Loading.....</p>
          </div>
        </div>
      </div>
    );
  };
  const errorMessege = () => {
    return (
      <div className="row" style={{ width: "100%" }}>
        <div className="col-md-12" style={{ width: "100%" }}>
          <div
            className="alert alert-danger"
            style={{ display: error ? "" : "none", width: "100%" }}
          >
            <p>{error} here</p>
          </div>
        </div>
      </div>
    );
  };

  const signinForm = () => {
    return (
      <div className="row">
        <form>
          <div className="row text-center">
            <div className="col-md-6 text-center" style={{ margin: "0 auto" }}>
              <div className="form-group">
                <input
                  type="email"
                  onChange={handelChange("email")}
                  value={email}
                  placeholder="Enter an email"
                />
              </div>
              <div className="form-group">
                <input
                  onChange={handelChange("password")}
                  value={password}
                  type="password"
                  placeholder="Enter password"
                />
              </div>
              <button
                onClick={onsubmit}
                className="btn btn-success btn-md signupbtn"
              >
                Signup
              </button>
            </div>
          </div>
        </form>
      </div>
    );
  };

  return (
    <Base title="signin page" description="Welcome again!">
      {loadingMessege()}
      {errorMessege()}
      {signinForm()}
      {Redirectuser()}
      <p>{JSON.stringify(values)}</p>
    </Base>
  );
};

export default Signin;
