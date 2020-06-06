import React, { useState, useEffect } from "react";
import Base from "../core/Base";
import { Link } from "react-router-dom";
import {
  getAllBrands,
  getAllBrandsofAdmin,
  deleteBrand,
} from "./helper/adminapicall";
import { isAuthenticated } from "../auth/helper";

const ManageBrands = () => {
  const [brands, setBrands] = useState([]);
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const { user, token } = isAuthenticated();

  const onDelete = (brandId) => {
    deleteBrand(brandId, user._id, token)
      .then((data) => {
        if (data === undefined) {
          setError("Error in deleting brand");
          setSuccess(false);
        } else if (data.error) {
          setError(data.error);
          setSuccess(false);
        } else {
          preload();
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
          <p>Brand deleted success fully</p>
        </div>
      </div>
    );
  };

  const preload = () => {
    getAllBrandsofAdmin(user._id)
      .then((data) => {
        if (data == undefined) {
          setError("Error in finding brands");
        } else if (data.error) {
          setError(data.error);
        } else {
          setBrands(data.brands);
          setError(false);
        }
      })
      .catch();
  };

  useEffect(() => {
    preload();
  }, []);

  const Managebrandpage = () => {
    return (
      <div className="row">
        <div className="col-md-12 bg-dark py-1">
          <h2 className="mb-4 text-white">All products:</h2>
          <Link className="btn btn-info" to={`/admin/dashboard`}>
            <span className="">Admin Home</span>
          </Link>
        </div>
        <div className="row  " style={{ width: "100%" }}>
          <div className="col-md-12 ">
            <h2 className="text-center text-dark my-3">
              Total {brands.length} brands
            </h2>
            {sucessMessage()}
            {errorMessage()}
            {brands.map((brand, index) => {
              return (
                <div
                  className="row text-center mb-2 py-1 px-2 bg-dark "
                  key={index}
                >
                  <div className="col-4">
                    <h4 className="text-white text-left">{brand.name}</h4>
                  </div>
                  <div className="col-4">
                    <Link
                      className="btn btn-success"
                      to={`/admin/brand/update/${brand._id}`}
                    >
                      <span className="">Update</span>
                    </Link>
                  </div>
                  <div className="col-4">
                    <button
                      className="btn btn-danger"
                      onClick={(e) => {
                        e.preventDefault();
                        onDelete(brand._id);
                      }}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  };
  return <Base title="Manage Brands">{Managebrandpage()}</Base>;
};

export default ManageBrands;
