// const express = require("express");
// const router = express.Router();
// const { isAdmin, isAuthenticated, isSignedIn } = require("../controllers/auth");

// const { getUserById } = require("../controllers/user");

// const {
//   getProductById,
//   createProduct,
//   getProduct,
//   photo,
//   deleteProduct,
//   updateProduct,
//   getAllproducts,
//   getUniqueBrands,
// } = require("../controllers/product");

// //params
// router.param("id", getUserById);
// router.param("productId", getProductById);

// router.post(
//   "/product/create/:id",
//   isSignedIn,
//   isAuthenticated,
//   isAdmin,
//   createProduct
// );

// router.get("/product/:productId", getProduct);
// router.get("/product/photo/:productId", photo);

// router.delete(
//   "/product/delete/:productId/:id",
//   isSignedIn,
//   isAuthenticated,
//   isAdmin,
//   deleteProduct
// );
// router.put(
//   "/product/update/:productId/:id",
//   isSignedIn,
//   isAuthenticated,
//   isAdmin,
//   updateProduct
// );

// router.get("/products", getAllproducts);

// module.exports = router;

const express = require("express");
const router = express.Router();

const { isSignedIn, isAdmin, isAuthenticated } = require("../controllers/auth");
const { getUserById } = require("../controllers/user");
const {
  getProductById,
  getProduct,
  photo,
  createProduct,
  upload,
  deleteProduct,
  updateProduct,
  getAllProducts,
  getAllProductsOfAdmin,
  getUniqueBrands,
} = require("../controllers/product");

router.param("id", getUserById);
router.param("productId", getProductById);

router.get("/product/:productId", getProduct);
router.get("/product/photo/:productId", photo);

router.post(
  "/product/create/:id",
  isSignedIn,
  isAuthenticated,
  isAdmin,
  upload.single("photo"),
  createProduct
);

router.put(
  "/product/update/:productId/:id",
  isSignedIn,
  isAuthenticated,
  isAdmin,
  upload.single("photo"),
  updateProduct
);

router.delete(
  "/product/delete/:productId/:id",
  isSignedIn,
  isAuthenticated,
  isAdmin,
  deleteProduct
);

router.get("/allProducts", getAllProducts);
router.get("/allProducts/admin/:id", getUserById, getAllProductsOfAdmin);
router.get("/brands", getUniqueBrands);
module.exports = router;
