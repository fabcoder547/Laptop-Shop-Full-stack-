import React, { useState, useEffect } from "react";
import Base from "../core/Base";
import { isAuthenticated } from "../auth/helper";
import { deleteBrand, updateBrand, getBrand } from "./helper/adminapicall";
import { Link } from "react-router-dom";

const UpdateBrand = ({ match }) => {
  const [brand, setBrand] = useState("");
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const { user, token } = isAuthenticated();
  const preload = () => {
    getBrand(match.params.brandId)
      .then((data) => {
        if (data.error) {
          setError(data.error);
        } else {
          console.log(data);
          setBrand(data.name);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    preload();
  }, []);

  const handelChange = (e) => {
    setBrand(e.target.value);
  };
  const onUpdate = () => {
    updateBrand(match.params.brandId, user._id, token, {
      name: brand,
    })
      .then((data) => {
        if (data === undefined) {
          setError("Error in upading brand");
        } else if (data.error) {
          setError(data.error);
          setSuccess(false);
        } else {
          setBrand("");
          setSuccess(true);
          setError(false);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const errorMessage = () => {
    return (
      <div
        className="row"
        style={{ display: error ? "" : "none", width: "100%" }}
      >
        <div className="col-md-12 badge badge-danger">
          <p>{error}</p>
        </div>
      </div>
    );
  };

  const sucessMessage = () => {
    return (
      <div
        className="row"
        style={{ display: success ? "" : "none", width: "100%" }}
      >
        <div className="col-md-12 badge badge-success">
          <p>Brand updated success fully</p>
        </div>
      </div>
    );
  };
  const addBrandForm = () => {
    return (
      <div className="form-group bg-dark">
        {errorMessage()}
        {sucessMessage()}
        <p className="text-white">Update Brand here!</p>
        <input
          className="form-control "
          required
          value={brand}
          onChange={handelChange}
        />
        <button className="btn btn-danger btn-sm">
          <Link className="nav-link text-white" to="/admin/dashboard">
            Go back!
          </Link>
        </button>
        <button
          className="btn btn-md btn-success rounded my-2 ml-5"
          onClick={onUpdate}
        >
          update brand
        </button>
      </div>
    );
  };
  return <Base title="update brand">{addBrandForm()}</Base>;
};

export default UpdateBrand;
