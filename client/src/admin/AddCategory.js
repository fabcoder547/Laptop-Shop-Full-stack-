import React, { useState } from "react";
import Base from "../core/Base";
import { Link } from "react-router-dom";
import { isAuthenticated } from "../auth/helper/index";
import { addBrand } from "./helper/adminapicall";
const Addbrand = () => {
  const [name, setName] = useState("");
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  const { user, token } = isAuthenticated();

  const handelChange = (e) => {
    setName(e.target.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    setError(false);

    addBrand({ name }, token, user._id)
      .then((data) => {
        if (data.error) {
          setError(data.error);
          setSuccess(false);
        } else {
          setName("");
          setSuccess(true);
          setError(false);
        }
      })
      .catch((err) => {
        alert("error in calling api");
      });
  };

  const successMessage = () => {
    if (success) {
      return (
        <p className="text-white bg-success p-2">Brand added successfully</p>
      );
    }
  };

  const errorMessage = () => {
    if (error) {
      return <p className="text-white bg-danger p-2">{error}</p>;
    }
  };
  const addBrandForm = () => {
    return (
      <div className="form-group">
        <p className="text-white">Add Brand here!</p>
        <input
          className="form-control"
          value={name}
          onChange={handelChange}
          placeholder="Eg:Dell"
          required
        />
        <button className="btn btn-danger btn-sm">
          <Link className="nav-link text-white" to="/admin/dashboard">
            Go back!
          </Link>
        </button>
        <button
          onClick={onSubmit}
          className="btn btn-md btn-success rounded my-2 ml-5"
        >
          create brand
        </button>
      </div>
    );
  };

  return (
    <Base title="create Brand" description="Add a new brand for selling">
      {successMessage()}
      {errorMessage()}
      <div className="row bg-dark rounded">
        <div className="col-md-12">{addBrandForm()}</div>
      </div>
    </Base>
  );
};

export default Addbrand;
