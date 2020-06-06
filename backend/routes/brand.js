const express = require("express");
const router = express.Router();
const { isAdmin, isAuthenticated, isSignedIn } = require("../controllers/auth");
const { getUserById } = require("../controllers/user");
const {
  getBrandById,
  createBrand,
  getBrand,
  getAllBrands,
  updateBrand,
  getAllBrandsOfAdmin,
  deleteBrand,
} = require("../controllers/brand");

router.param("id", getUserById);
router.param("brandId", getBrandById);

router.post(
  "/brands/create/:id",
  isSignedIn,
  isAuthenticated,
  isAdmin,
  createBrand
);
router.get("/brand/:brandId", getBrand);

router.get("/brands", getAllBrands);
router.get("/brands/admin/:id", getAllBrandsOfAdmin);

router.put(
  "/brand/:brandId/user/:id",
  isSignedIn,
  isAuthenticated,
  isAdmin,
  updateBrand
);

router.delete(
  "/brand/:brandId/user/:id",
  isSignedIn,
  isAuthenticated,
  isAdmin,
  deleteBrand
);

module.exports = router;
