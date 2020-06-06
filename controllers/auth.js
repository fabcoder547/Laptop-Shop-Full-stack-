const User = require("../models/user");
var expressJwt = require("express-jwt");
var jwt = require("jsonwebtoken");

const { check, validationResult } = require("express-validator");

exports.signup = (req, res) => {
  console.log(req.header + "yeah");

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({
      errors: errors,
    });
  }
  const user = new User(req.body);
  user.save((err, user) => {
    if (err) {
      return res.status(400).json({
        err: "User is Not able to save in a database",
      });
    }
    res.json({
      name: user.name,
      lastname: user.lastname,
      email: user.email,
    });
  });
};

exports.signin = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({
      errors: errors,
    });
  }
  User.findOne(
    {
      email: req.body.email,
    },
    (err, user) => {
      if (err) {
        return res.status(400).json({
          err: "error in finding a user",
        });
      }

      if (!user) {
        return res.status(400).json({
          err: "User with this email is not exists",
        });
      }
      if (!user.authenticate(req.body.password)) {
        return res.json({
          err: "Email and password doesnt match",
        });
      }
      var token = jwt.sign(
        {
          id: user._id,
        },
        process.env.SECRET
      );
      res.cookie("token", token, {
        maxAge: 55500000,
      });
      res.cookie("tp", 2000);

      //send response

      const { _id, name, email, role } = user;

      return res.json({
        token,
        user: {
          _id,
          name,
          email,
          role,
        },
      });
    }
  );
};

exports.signout = (req, res) => {
  res.clearCookie("token");
  res.json({
    msg: "User signOut success",
  });
};

exports.isSignedIn = expressJwt({
  secret: process.env.SECRET,
});

exports.isAuthenticated = (req, res, next) => {
  let checker = req.profile && req.user && req.profile._id == req.user.id;

  if (!checker) {
    return res.status(403).send("ACCESS DENIED");
  }
  next();
};

exports.isAdmin = (req, res, next) => {
  if (req.profile.role == 0) {
    return res.status(403).send("ACCESS DENIED NO ADMIN");
  }
  next();
};
