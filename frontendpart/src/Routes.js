import React from "react";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import Home from "./core/Home";
import Signin from "./user/Signin";
import Signup from "./user/Signup";
import { signin } from "./auth/helper";
import PrivateRoute from "./auth/helper/PrivateRoutes";

// import "./styles.css";
// import "./nav.css";
const Routes = () => {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={Home}></Route>
        <Route path="/signup" exact component={Signup}></Route>
        <PrivateRoute path="/signin" component={Signin} exact></PrivateRoute>
      </Switch>
    </Router>
  );
};

export default Routes;
