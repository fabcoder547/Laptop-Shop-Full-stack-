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
import ManageProducts from "./admin/ManageProducts";
import UpdateProduct from "./admin/UpdateProduct";
import UpdateBrand from "./admin/updateBrand";
import Cart from "./core/Cart";
import Orders from "./admin/Orders";
import UserOrders from "./user/Orders";
import UpdateOrder from "./admin/helper/UpdateOrder";
import Activate from "./user/Activate";
import Forgetpassword from "./user/Forgetpassword";
import Resetpassword from "./user/Resetpassword";

// import "./styles.css";
// import "./nav.css";
const Routes = () => {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={Home}></Route>
        <Route path="/signup" exact component={Signup}></Route>
        <Route path="/signin" exact component={Signin}></Route>
        <Route path="/users/activate/:token" exact component={Activate} />
        <Route path="/users/forget/password" exact component={Forgetpassword} />
        <Route
          path="/users/reset/password/:token"
          exact
          component={Resetpassword}
        />
        <AdminRoute path="/admin/dashboard" exact component={AdminDashboard} />
        <AdminRoute path="/admin/create/brand" exact component={Addbrand} />
        <AdminRoute path="/admin/brands" exact component={ManageBrands} />
        <AdminRoute path="/admin/create/product" exact component={AddProduct} />
        <AdminRoute path="/admin/products" exact component={ManageProducts} />
        <AdminRoute path="/admin/orders" exact component={Orders} />
        <AdminRoute
          path="/admin/product/update/:productId"
          exact
          component={UpdateProduct}
        />
        <AdminRoute
          path="/admin/brand/update/:brandId"
          exact
          component={UpdateBrand}
        ></AdminRoute>
        <AdminRoute
          path="/admin/order/update/:orderId"
          component={UpdateOrder}
          exact
        />
        <PrivateRoute path="/cart" component={Cart}></PrivateRoute>
        <PrivateRoute
          path="/user/orders"
          exact
          component={UserOrders}
        ></PrivateRoute>
      </Switch>
    </Router>
  );
};

export default Routes;
