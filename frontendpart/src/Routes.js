import React from "react";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import Home from "./core/Home";
import Signin from "./user/Signin";
import Signup from "./user/Signup";
import PrivateRoute from "./auth/helper/PrivateRoutes";
import AdminRoute from "./auth/helper/AdminRoutes";
import UserDashboard from "./user/UserDashBoard";
import AdminDashboard from "./user/AdminDashBoard";
import Addbrand from "./admin/AddCategory";
import ManageBrands from "./admin/manageBrand";
import AddProduct from "./admin/AddProduct";
// import "./styles.css";
// import "./nav.css";
const Routes = () => {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={Home}></Route>
        <Route path="/signup" exact component={Signup}></Route>
        <Route path="/signin" exact component={Signin}></Route>
        <PrivateRoute path="/user/dashboard" exact component={UserDashboard} />
        <AdminRoute path="/admin/dashboard" exact component={AdminDashboard} />
        <AdminRoute path="/admin/create/brand" exact component={Addbrand} />
        <AdminRoute path="/admin/brands" exact component={ManageBrands} />
        <AdminRoute path="/admin/create/product" exact component={AddProduct} />
      </Switch>
    </Router>
  );
};

export default Routes;
