import React, { useState } from "react";
import Base from "../core/Base";
import "../css/form.css";
import { Link } from "react-router-dom";
import { signup } from "../auth/helper/index";

const Signup = () => {
  const [values, setValues] = useState({
    name: "",

    lastname: "",
    email: "",
    password: "",
    userinfo: "",
    error: "",
    success: false,
  });

  const { name, email, password, error, success, lastname, userinfo } = values;

  const handelChange = (name) => (e) => {
    setValues({ ...values, error: false, [name]: e.target.value });
  };

  const onsubmit = (e) => {
    e.preventDefault();
    setValues({ ...values, error: false });

    signup({ name, email, password, userinfo, lastname })
      .then((data) => {
        if (data.err) {
          console.log(data);
          alert("failed");
          setValues({
            ...values,
            error: "Error !please try again!",
            success: false,
          });
        } else if (data.errors) {
          setValues({
            ...values,
            error: data.errors.errors[0].msg,
            success: false,
          });
        } else {
          console.log(data);

          alert("success");
          setValues({
            ...values,
            name: "",
            password: "",
            userinfo: "",
            error: "",
            success: true,
            email: "",
            lastname: "",
          });
        }
      })
      .catch((err) => {
        console.log("error in signup  " + err);
      });
  };

  const successMessege = () => {
    return (
      <div className="row" style={{ width: "100%" }}>
        <div className="col-md-12" style={{ width: "100%" }}>
          <div
            className="alert alert-success"
            style={{
              display: success ? "" : "none",
              width: "100%",
            }}
          >
            <p>
              Signup successfully please <Link to="signin">login Here</Link>
            </p>
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
  const signUpForm = () => {
    return (
      <div className="row">
        {successMessege()}
        {errorMessege()}
        <form>
          <div className="row">
            <div className="col-md-6 text-center">
              <div className="form-group">
                <input
                  required
                  type="text"
                  value={name}
                  onChange={handelChange("name")}
                  placeholder="first Name"
                />
              </div>
              <div className="form-group">
                <input
                  onChange={handelChange("lastname")}
                  type="text"
                  value={lastname}
                  placeholder="last Name"
                />
              </div>
              <div className="form-group">
                <input
                  required
                  value={email}
                  onChange={handelChange("email")}
                  type="email"
                  placeholder="Enter an email"
                />
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-group">
                <input
                  required
                  value={password}
                  onChange={handelChange("password")}
                  type="password"
                  placeholder="Enter password"
                />
              </div>
              <div className="form-group">
                <input
                  value={userinfo}
                  type="text"
                  onChange={handelChange("userinfo")}
                  placeholder="Enter more Information"
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
    <Base title="Signup page">
      {signUpForm()}
      <p>{JSON.stringify(values)}</p>
    </Base>
  );
};

export default Signup;
