import React, { Fragment } from "react";
import "../css/nav.css";
import { Link, withRouter, Redirect } from "react-router-dom";
import { isAuthenticated, signout } from "../auth/helper/index";
const currentTab = (history, path) => {
  if (history.location.pathname === path) {
    return { color: "#fff" };
  } else {
    return { color: "#fff" };
  }
};
const Navbar = ({ history, location }) => {
  return (
    <nav className="navbar navbar-custom navbar-expand-lg">
      <a className="navbar-brand" href="#">
        <i class="fa fa-laptop"></i> LapiShop
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
        <span className="navbar-toggler-icon">
          <i class="fa fa-bars"></i>
        </span>
      </button>

      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav ml-auto">
          <li className="nav-item ">
            <Link to="/" className="nav-link">
              <i class="fa fa-home"></i> Home
            </Link>
          </li>
          <li className="nav-item">
            <Link
              to="/cart"
              className="nav-link"
              style={currentTab(history, "/cart")}
            >
              <i class="fa fa-cart-plus"></i> Cart
            </Link>
          </li>
        
          <li className="nav-item">
            <Link
              to="/user/orders"
              className="nav-link"
              style={currentTab(history, "/cart")}
            >
              <i class="fa fa-cart-plus"></i> orders
            </Link>
          </li>
          {isAuthenticated() && isAuthenticated().user.role === 1 && (
            <li className="nav-item">
              <Link
                to="/admin/dashboard"
                className="nav-link"
                style={currentTab(history, "/admin/dashboard")}
              >
                <i class="fa fa-user-shield"></i> A.dashboard
              </Link>
            </li>
          )}
          {!isAuthenticated() && (
            <Fragment>
              <li className="nav-item">
                <Link
                  to="/signup"
                  className="nav-link"
                  style={currentTab(history, "/signup")}
                >
                  <i class="fa fa-user-plus"></i> signup
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  to="/signin"
                  className="nav-link"
                  style={currentTab(history, "/signin")}
                >
                  <i class="fa fa-sign-in-alt"></i> signin
                </Link>
              </li>
            </Fragment>
          )}

          {isAuthenticated() && (
            <li className="nav-item">
              <Link
                className="nav-link"
                style={currentTab(history, "/signout")}
              >
                <span
                  onClick={() => {
                    signout(() => {
                      history.push("/");
                    
                    });
                  }}
                >
                  signout
                </span>
              </Link>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default withRouter(Navbar);

//
