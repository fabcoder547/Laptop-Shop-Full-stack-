import React from "react";
import Base from "../core/Base";
import { isAuthenticated } from "../auth/helper/index";
import { Link } from "react-router-dom";
const AdminDashboard = () => {
  const { name, email, role } = isAuthenticated().user;

  const adminLeftSide = () => {
    return (
      <div className="card">
        <h4 className="card-header bg-dark text-white">admin navigation</h4>
        <ul className="list-group">
          <li className="list-group-item bg-dark text-white p-1 m-1">
            <Link to="/admin/create/brand" className="nav-link text-white">
              create brand
            </Link>
          </li>
          <li className="list-group-item bg-dark text-white p-1 m-1">
            <Link to="/admin/brands" className="nav-link text-white">
              Manage Brands
            </Link>
          </li>
          <li className="list-group-item bg-dark text-white p-1 m-1">
            <Link to="/admin/create/product" className="nav-link text-white">
              create product
            </Link>
          </li>
          <li className="list-group-item bg-dark text-white p-1 m-1">
            <Link to="/admin/products" className="nav-link text-white">
              manage product
            </Link>
          </li>
          <li className="list-group-item bg-dark text-white p-1 m-1">
            <Link to="/admin/orders" className="nav-link text-white">
              manage order
            </Link>
          </li>
        </ul>
      </div>
    );
  };

  const adminRightSide = () => {
    return (
      <div className="card mb-4">
        <h4 className="card-header bg-dark text-white">Admin information</h4>
        <ul className="list-group">
          <li className="list-group-item">
            <span className="badge badge-success ml-0">Name:</span>
            {name}
          </li>
          <li className="list-group-item">
            <span className="badge badge-success mr-2">Email:</span>
            {email}
          </li>
          <li className="list-group-item">
            <span className="badge badge-danger mr-2">Admin Area</span>
          </li>
        </ul>
      </div>
    );
  };

  return (
    <Base
      title="Welcome to admin area"
      description="manage all your products here"
    >
      <div className="row">
        <div className="col-md-3"> {adminLeftSide()}</div>
        <div className="col-md-9"> {adminRightSide()}</div>
      </div>
    </Base>
  );
};

export default AdminDashboard;
