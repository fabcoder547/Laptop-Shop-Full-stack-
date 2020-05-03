import React from "react";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import Home from "./core/Home";
import Signup from "./user/Signup";
// import "./styles.css";
// import "./nav.css";
const Routes = () => {
  return (
    <Router>
      <switch>
        <Route path="/" exact component={Home}></Route>
        <Route path="/signup" exact component={Signup}></Route>
      </switch>
    </Router>
  );
};

export default Routes;
