const Brand = require("../models/Brand");

exports.getBrandById = (req, res, next, id) => {
  Brand.findById(id).exec((err, brand) => {
    if (err) {
      return res.status(400).json({
        error: "Error in finding brand by id",
      });
    } else {
      req.brand = brand;
      next();
    }
  });
};

exports.createBrand = (req, res) => {
  const objBrand = {};
  objBrand.name = req.body.name;
  objBrand.user = req.profile._id;
  const newbrand = new Brand(objBrand);

  newbrand.save((err, brand) => {
    if (err) {
      return res.status(400).json({
        error: "error in saving abrand to the DB",
      });
    }
    res.json({
      messaege: "Brand created Successfully",
      brand,
    });
  });
};

exports.getBrand = (req, res) => {
  return res.json(req.brand);
};

exports.getAllBrands = (req, res) => {
  Brand.find().exec((err, brands) => {
    if (err) {
      return res.status(400).json({
        error: "no brands found",
      });
    }
    res.json({
      messsege: "All Brands",
      brands,
    });
  });
};

exports.getAllBrandsOfAdmin = (req, res) => {
  Brand.find({ user: req.profile._id }).exec((err, brands) => {
    if (err) {
      return res.status(400).json({
        error: "no brands found",
      });
    }
    res.json({
      messsege: "All Brands",
      brands,
    });
  });
};

exports.updateBrand = (req, res) => {
  Brand.findOneAndUpdate(
    {
      _id: req.brand._id,
    },
    {
      $set: req.body,
    },
    {
      new: true,
      useFindAndModify: false,
    },
    (err, brand) => {
      if (err) {
        return res.status(400).json({
          error: "error in updating brand",
        });
      } else {
        res.json(brand);
      }
    }
  );
};

exports.deleteBrand = (req, res) => {
  brand = req.brand;
  brand.remove((err, brand) => {
    if (err) {
      return res.status(400).json({
        error: "error in deleting brand",
      });
    }
    res.json({
      messege: "Successfully deleted!",
    });
  });
};
