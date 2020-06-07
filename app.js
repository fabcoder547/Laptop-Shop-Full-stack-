const path = require("path");
const PORT = process.env.PORT || 5000;
const mongoose = require("mongoose");
const express = require("express");
const app = express();
const bodyparser = require("body-parser");
const cookieparser = require("cookie-parser");
const cors = require("cors");
//myroutes
const authRouters = require("./routes/auth");
const userRoutes = require("./routes/user");
const brandRoutes = require("./routes/brand");
const productRoutes = require("./routes/product");
const orderRoutes = require("./routes/order");
const stripeRoutes = require("./routes/stripePayment");
// connecting to the Database....
// mongodb://localhost:27017/laptop
mongoose
  .connect(process.env.MONGODB_URI || process.env.DATABASE, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("connected successfully");
  })
  .catch((err) => {
    console.log(process.env.DATABASE);
    console.log("not connected", err.message);
  });

// MIDDLEWARES ARE HERE
app.use(
  bodyparser.urlencoded({
    extended: false,
  })
);
app.use(bodyparser.json());
app.use(cookieparser());
app.use(cors());
app.use("/api", authRouters);
app.use("/api", userRoutes);
app.use("/api", brandRoutes);
app.use("/api", productRoutes);
app.use("/api", orderRoutes);
app.use("/api", stripeRoutes);
app.get("/", (req, res) => {
  res.send("Hey Laptop shop");
});

if (process.env.NODE_ENV === "production") {
  app.use(express.static("../client/build"));
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "build", "index.html"));
  });
} else {
  require("dotenv").config();
}

app.listen(PORT, () => {
  console.log("server is running at 5000");
});
