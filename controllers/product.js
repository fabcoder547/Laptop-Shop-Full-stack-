const Product = require("../models/Product");
const formidable = require("formidable");
const _ = require("lodash");
const multer = require("multer");
const fs = require("fs");
const path = require("path");

// exports.getProductById = (req, res, next, id) => {
//   Product.findById(id).exec((err, product) => {
//     if (err) {
//       return res.status(400).json({
//         error: "error in finding a product in adatabase",
//       });
//     }
//     req.product = product;
//     next();
//   });
// };

// exports.createProduct = (req, res) => {
//   const form = new formidable.IncomingForm();
//   form.keepExtensions = true;

//   form.parse(req, (err, fields, file) => {
//     if (err) {
//       return res.status(400).json({
//         error: "Error in uplaoded Image",
//       });
//     }

//     newLaptop = {};
//     description = {
//       memory: {},
//     };
//     if (fields.name) newLaptop.name = fields.name;
//     if (fields.price) newLaptop.price = fields.price;
//     if (fields.stock) newLaptop.stock = fields.stock;
//     if (fields.ram) {
//       description.memory.ram = fields.ram;
//     }
//     if (fields.rom) {
//       description.memory.rom = fields.rom;
//     }
//     if (fields.display) {
//       description.memory.display = fields.display;
//     }
//     if (fields.processor) description.processor = fields.processor;
//     if (fields.brand) description.brand = fields.brand;

//     newLaptop.description = description;

//     newProduct = new Product(newLaptop);
//     console.log(newLaptop);
//     if (file.photo) {
//       if (file.photo.size > 4000000) {
//         return res.status(400).json({
//           error: "too big file",
//         });
//       }

//       newProduct.photo.data = fs.readFileSync(file.photo.path);
//       newProduct.photo.contentType = file.photo.type;
//       newProduct
//         .save()
//         .then((product) => {
//           res.json({
//             msg: "created successfully",
//             product: product,
//           });
//         })
//         .catch((err) => {
//           res.json({
//             msg: "Error in saving product in database",
//           });
//         });
//     }
//   });
// };

// exports.getProduct = (req, res) => {
//   req.product.photo = undefined; //this is for performance optimization
//   return res.json(req.product);
// };

// exports.photo = (req, res, next) => {
//   if (req.product.photo.data) {
//     res.set("Content-Type", req.product.photo.contentType);
//     return res.send(req.product.photo.data);
//   }
//   next();
// };

// exports.deleteProduct = (req, res) => {
//   let product = req.product;
//   product
//     .remove()
//     .then(() => {
//       res.json({
//         msg: "Deleted successfully",
//       });
//     })
//     .catch((err) => {
//       res.status(400).json({
//         error: "Error in deleting a product",
//       });
//     });
// };

// exports.updateProduct = (req, res) => {
//   const form = new formidable.IncomingForm();
//   form.keepExtensions = true;

//   form.parse(req, (err, fields, file) => {
//     if (err) {
//       return res.status(400).json({
//         error: "Error in uplaoded Image",
//       });
//     }

//     newLaptop = {};
//     description = {
//       memory: {},
//     };
//     if (fields.name) newLaptop.name = fields.name;
//     if (fields.price) newLaptop.price = fields.price;
//     if (fields.stock) newLaptop.stock = fields.stock;
//     if (fields.ram) {
//       description.memory.ram = fields.ram;
//     }
//     if (fields.rom) {
//       description.memory.rom = fields.rom;
//     }
//     if (fields.display) {
//       description.memory.display = fields.display;
//     }
//     if (fields.processor) description.processor = fields.processor;
//     if (fields.brand) description.brand = fields.brand;

//     newLaptop.description = description;

//     let newProduct = req.product;

//     // newProduct = newLaptop;
//     _.extend(newProduct, newLaptop);

//     // console.log(newProduct);
//     if (file.photo) {
//       if (file.photo.size > 4000000) {
//         return res.status(400).json({
//           error: "too big file",
//         });
//       }

//       newProduct.photo.data = fs.readFileSync(file.photo.path);
//       newProduct.photo.contentType = file.photo.type;
//       newProduct
//         .save()
//         .then((product) => {
//           res.json({
//             msg: "Updated successfully",
//             product: product,
//           });
//         })
//         .catch((err) => {
//           res.json({
//             msg: "Error in updating product in database",
//           });
//         });
//     }
//   });
// };

// exports.getAllproducts = (req, res) => {
//   let limit = req.query.limit ? parseInt(req.query.limit) : 8;
//   let sortBy = req.query.sortBy ? req.query.sortBy : "_id";
//   Product.find()
//     .populate("description.brand")
//     .select("-photo")
//     .sort({
//       sortBy: -1,
//     })
//     .limit(limit)
//     .exec((err, products) => {
//       if (err) {
//         return res.status(400).json({
//           error: "Error in finding products",
//         });
//       }
//       res.json(products);
//     });
// };

const storage = multer.memoryStorage();

exports.upload = multer({ storage: storage });

exports.getProductById = (req, res, next, id) => {
  Product.findById(id).exec((err, product) => {
    if (err) {
      return res.status(400).json({
        msg: "Cannot find product by Id",
      });
    } else {
      req.product = product;
      next();
    }
  });
};

exports.getProduct = (req, res) => {
  req.product.photo = undefined;
  res.json({
    msg: "product found successfully",
    product: req.product,
  });
};

exports.photo = (req, res, next) => {
  if (req.product.photo.data) {
    res.set("Content-Type", req.product.photo.contentType);
    res.send(req.product.photo.data);
  }
  next();
};

exports.createProduct = (req, res) => {
  console.log("i got it");
  const newLaptop = {};
  newLaptop.user = req.profile._id;
  const description = {};
  description.memory = {};
  if (req.body.name) newLaptop.name = req.body.name;
  if (req.body.price) newLaptop.price = req.body.price;
  if (req.body.stock) newLaptop.stock = req.body.stock;
  if (req.body.processor) description.processor = req.body.processor;
  if (req.body.ram) description.memory.ram = req.body.ram;
  if (req.body.display) description.display = req.body.display;
  if (req.body.rom) description.memory.rom = req.body.rom;
  if (req.body.brand) description.brand = req.body.brand;
  newLaptop.photo = {};
  newLaptop.description = description;
  const newproduct = new Product(newLaptop);
  newproduct.photo.data = req.file.buffer;
  newproduct.photo.contentType = req.file.mimetype;

  console.log(req.file);

  newproduct
    .save()
    .then((product) => {
      return res.json({
        msg: "done",
        product,
      });
    })
    .catch((err) => {
      res.json({
        error: "error in saving",
        err,
        file: req.file.fieldname,
      });
    });
};

exports.updateProduct = (req, res) => {
  const originalProduct = req.product;

  const newLaptop = {};
  const description = {};
  description.memory = {};
  if (req.body.name) newLaptop.name = req.body.name;
  if (req.body.price) newLaptop.price = req.body.price;
  if (req.body.stock) newLaptop.stock = req.body.stock;

  if (!req.body.ram && originalProduct.description.memory.ram) {
    description.memory.ram = originalProduct.description.memory.ram;
  } else {
    description.memory.ram = req.body.ram;
  }
  if (!req.body.rom && originalProduct.description.memory.rom) {
    description.memory.rom = originalProduct.description.memory.rom;
  } else {
    description.memory.rom = req.body.rom;
  }

  if (!req.body.processor && originalProduct.description.processor) {
    description.processor = originalProduct.description.processor;
  } else {
    description.processor = req.body.processor;
  }

  if (!req.body.brand && originalProduct.description.brand) {
    description.brand = originalProduct.description.brand;
  } else {
    description.brand = req.body.brand;
  }
  if (!req.body.display && originalProduct.description.display) {
    description.display = originalProduct.description.display;
  } else {
    description.display = req.body.display;
  }

  newLaptop.photo = {};
  newLaptop.description = description;

  if (!req.file && originalProduct.photo.data) {
    newLaptop.photo.data = originalProduct.photo.data;
    newLaptop.photo.contentType = originalProduct.photo.contentType;
  } else {
    newLaptop.photo.data = req.file.buffer;
    newLaptop.photo.contentType = req.file.mimetype;
  }
  _.extend(originalProduct, newLaptop);

  originalProduct
    .save()
    .then((product) => {
      res.json({
        msg: "Updated successfully",
        product: product,
      });
    })
    .catch((err) => {
      res.json({
        error: "Error in saving a product",
      });
    });
};

exports.deleteProduct = (req, res) => {
  let myproduct = req.product;
  myproduct
    .remove()
    .then(() => {
      res.json({
        msg: "deleted successfully",
      });
    })
    .catch((err) => {
      return res.json({
        error: "error in removing a product ",
      });
    });
};

exports.getAllProducts = (req, res) => {
  var limit = req.query.limit ? parseInt(req.query.limit) : 8;
  var sortwith = req.query.sortby ? req.query.sortby : "price";

  Product.find()
    .populate("description.brand")
    .limit(limit)
    .sort([[sortwith, -1]])
    .select("-photo")
    .exec((err, products) => {
      if (err) {
        return res.json({
          error: "error in finding all products",
        });
      }
      if (!products) {
        return res.json({
          error: "No produts yet",
        });
      }
      res.status(200).json({
        msg: "Done",
        products,
      });
    });
};

exports.getAllProductsOfAdmin = (req, res) => {
  var limit = req.query.limit ? parseInt(req.query.limit) : 8;
  var sortBy = req.query.sortby ? req.query.sortby : "_id";
  Product.find({ user: req.profile._id })
    .populate("description.brand")
    .limit(limit)
    .sort({ sortBy: -1 })
    .select("-photo")
    .exec((err, products) => {
      if (err) {
        return res.json({
          error: "error in finding all products",
        });
      }
      if (!products) {
        return res.json({
          error: "No produts yet",
        });
      }
      res.status(200).json({
        msg: "Done",
        products,
      });
    });
};

exports.getUniqueBrands = (req, res) => {
  Product.distinct("description.brand", {}, (err, brands) => {
    if (err) {
      return res.status(400).json({
        error: "No brand found",
      });
    }
    res.json(brands);
  });
};

exports.updateStock = (req, res, next) => {
  //In your Schema thereis orders and in his file products
  console.log("update ", req.body.orders);
  let myOperations = req.body.order.orders.map((order) => {
    return {
      updatrOne: {
        filter: {
          _id: order._id,
        },
        update: {
          $inc: {
            stock: -order.count,
            sold: +order.count,
          },
        },
      },
    };
  });

  Product.bulkWrite(myOperations, {}, (err, result) => {
    if (err) {
      return res.status(400).json({
        msg: "Bulkright Operation Failed",
      });
    }
    next();
  });
};
