const express = require("express");
const router = express.Router();

const { isSignedIn, isAdmin, isAuthenticated } = require("../controllers/auth");
const { getUserById, pushOrderInpurchaselist } = require("../controllers/user");
const { updateStock } = require("../controllers/product");

const {
  getOrderById,
  createOrder,
  getAllOrders,
  updateStatus,
  getOrderStatus,
  getOrder,
  getOrdersOfUser
} = require("../controllers/order");

router.param("id", getUserById);
router.param("orderId", getOrderById);


router.get('/order/:orderId/user/:id',isSignedIn,isAuthenticated,isAdmin,getOrder)

router.post(
  "/order/create/:id",
  isSignedIn,
  isAuthenticated,
  pushOrderInpurchaselist,

  createOrder
);

router.get(
  "/order/all/:id",
  isSignedIn,
  isAuthenticated,
  isAdmin,
  getAllOrders
);

//status of order
router.get(
  "/order/status/:id",
  isSignedIn,
  isAuthenticated,
  isAdmin,
  getOrderStatus
);
router.put(
  "/order/:orderId/status/:id",
  isSignedIn,
  isAuthenticated,
  isAdmin,
  updateStatus
);


router.get("/order/user/orders/:id",isSignedIn,isAuthenticated,getOrdersOfUser)
module.exports = router;
