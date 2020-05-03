import React from "react";
import "../css/nav.css";
import { Link, withRouter } from "react-router-dom";

const currentTab = (history, path) => {
  if (history.location.pathname === path) {
    return { color: "#fff" };
  } else {
    return { color: "#fff" };
  }
};
const Navbar = ({ history }) => {
  {
    console.log(history);
  }
  return (
    <nav className="navbar navbar-custom navbar-expand-lg">
      <a className="navbar-brand" href="#">
        Navbar
      </a>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav ml-auto">
          <li className="nav-item ">
            <Link to="/" className="nav-link">
              Home
            </Link>
          </li>
          <li className="nav-item">
            <Link
              to="/cart"
              className="nav-link"
              style={currentTab(history, "/cart")}
            >
              Cart
            </Link>
          </li>
          <li className="nav-item">
            <Link
              to="/dashboard"
              className="nav-link"
              style={currentTab(history, "/dashboard")}
            >
              dashboard
            </Link>
          </li>
          <li className="nav-item">
            <Link
              to="/admin/dashboard"
              className="nav-link"
              style={currentTab(history, "/admin/dashboard")}
            >
              A.dashboard
            </Link>
          </li>
          <li className="nav-item">
            <Link
              to="/signup"
              className="nav-link"
              style={currentTab(history, "/signup")}
            >
              signup
            </Link>
          </li>
          <li className="nav-item">
            <Link
              to="/signin"
              className="nav-link"
              style={currentTab(history, "/signin")}
            >
              signin
            </Link>
          </li>
          <li className="nav-item">
            <Link
              to="/signout"
              className="nav-link"
              style={currentTab(history, "/signout")}
            >
              signout
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default withRouter(Navbar);

//
