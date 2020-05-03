const { Order, productCart } = require("../models/order");

exports.getOrderById = (req, res, next, orderId) => {
  Order.findById(orderId)
    .populate("orders.order", "name price")
    .then((order) => {
      req.order = order;
      next();
    })
    .catch((err) => {
      return res.status(400).json({
        error: "error in getting order by id",
      });
    });
};

exports.createOrder = (req, res) => {
  req.body.order.user = req.profile;

  const order = new Order(req.body.order);
  order.save((err, order) => {
    if (err) {
      return res.status(400).json({
        msg: "error in saving order into the database",
      });
    }
    res.status(200).json(order);
  });
};

exports.getAllOrders = (req, res) => {
  Order.find()
    .populate("user")
    .then((orders) => {
      res.json(orders);
    })
    .catch((err) => {
      res.status(400).json({
        msg: "error in getting all orders",
      });
    });
};

exports.getOrderStatus = (req, res) => {
  //
  res.json(Order.schema.path("status").enumValues);
};

exports.updateStatus = (req, res) => {
  //
  Order.update(
    {
      _id: req.body.order.orderId,
    },
    {
      $set: {
        status: req.body.status,
      },
    },
    (err, order) => {
      if (err) {
        return res.status(400).json({
          error: "Cannot update order status",
        });
      }
      res.json(order);
    }
  );
};
