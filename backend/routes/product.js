const express = require('express');
const router = express.Router();
const {
    isAdmin,
    isAuthenticated,
    isSignedIn
} = require('../controllers/auth')


const {
    getUserById
} = require('../controllers/user')


const {
    getProductById,
    createProduct
} = require('../controllers/product')

//params
router.param('id', getUserById);
router.param('productId', getProductById);


router.post('/product/create/:id', isSignedIn, isAuthenticated, isAdmin, createProduct)
module.exports = router;