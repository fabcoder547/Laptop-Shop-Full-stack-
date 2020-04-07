const User = require('../models/user');
const Order = require("../models/order");
const mongoose = require('mongoose');


exports.getUserById = (req, res, next, id) => {
        User.findById(id).exec((err, user) => {
            if (err || !user) {
                return res.status(400).json({
                    msg: "No user found in DB",
                })
            }
            req.profile = user;
            next();
        })


    }
    //Most Important here
    // exports.fetchprofile = (req, res, next) => {
    //     User.findById(req.params.id)
    //         .then(user => {
    //             if (!user) {
    //                 return res.status(400).json({
    //                     msg: "No user found"
    //                 })

//             }
//             req.profile = user;
//             next();
//         })
//         .catch(err => {
//             return res.status(400).json({
//                 msg: "Error in finding the user in database"
//             })
//         })
// }

exports.getUser = (req, res) => {
    req.profile.encry_password = undefined;
    req.profile.salt = undefined;
    req.profile.createdAt = undefined;
    req.profile.updatedAt = undefined;
    return res.json(req.profile)

}

exports.updateUser = (req, res) => {
    User.findByIdAndUpdate({
            _id: req.profile._id
        }, {
            $set: req.body
        }, {
            new: true,
            useFindAndModify: false
        },
        (err, user) => {
            if (err) {
                return res.status(400).json({
                    msg: 'you are not authorised to update user'
                })
            }
            user.encry_password = undefined;
            user.salt = undefined;
            user.createdAt = undefined;
            user.updatedAt = undefined;
            res.json({
                msg: "update done",
                user
            });
        }
    )
}

//Exporing a function for populating the orders

exports.showOrders = (req, res) => {

    Order.find({
            user: req.user.id
        })
        .populate('user')
        .exec((err, order) => {
            if (err) {
                return res.status(403).res.json({
                    error: "No order with this user",

                })
            }
            res.json(order);
        })

}


exports.pushOrderInpurchaaselist = (req, res, next) => {

    purchases = [];
    req.body.order.orders.forEach((laptop => {

        purchases.push({

            _id: req.profile._id,
            name: laptop.name,
            description: laptop.description,
            category: laptop.category,
            quantity: laptop.count,
            amount: req.body.order.amount,
            transaction_id: req.body.order.transaction_id,

        })
    }));

    User.findOneAndUpdate({
        _id: req.profile._id,
    }, {
        $push: {
            purchases: purchases
        }
    }, {
        new: true
    }, (err, user) => {

        if (err) {
            return res.status(400).json({
                error: 'Unable to sAve apurchase list'
            })
        }
        next();
    })

}