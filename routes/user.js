const express = require('express');
const router = express.Router();

const {
    getUserById,
    getUser,
    updateUser,
    showOrders

} = require('../controllers/user');
const {
    isAuthenticated,
    isAdmin,
    isSignedIn, 

} = require('../controllers/auth');


router.param('id', getUserById);


router.get('/user/:id', isSignedIn, isAuthenticated, getUser);
// router.get('/user/:id', isSignedIn, isAuthenticated, getUser);
router.put('/user/:id', isSignedIn, isAuthenticated, updateUser);

//This is route for showing orders to the user......
router.get('/orders/user/:id', isSignedIn, isAuthenticated, showOrders)



module.exports = router;