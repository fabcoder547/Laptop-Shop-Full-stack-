const User = require('../models/user')
var expressJwt = require('express-jwt');
var jwt = require('jsonwebtoken');

const {
    check,
    validationResult
} = require('express-validator');


exports.signup = (req, res) => {
    console.log(req.header);

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({
            errors: errors
        })
    }
    const user = new User(req.body);
    user.save((err, user) => {
        if (err) {
            return res.status(400).json({
                msg: "User is Not able to save in a database"
            })
        }
        res.json({
            name: user.name,
            lastname: user.lastname,
            email: user.email
        })
    })


}


exports.signin = (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({
            errors: errors
        })
    }
    User.findOne({
        email: req.body.email
    }, (err, user) => {
        if (err) {
            return res.status(400).json({
                msg: "error in finding a user"
            })
        }

        if (!user) {
            return res.status(400).json({
                msg: "User with this email is not exists"
            })
        }
        if (!user.authenticate(req.body.password)) {
            return res.json({
                msg: "Email and password doesnt match"
            });
        }
        var token = jwt.sign({
            _id: user._id
        }, process.env.SECRET);
        res.cookie("token", token, {
                expire: '1h'
            })
            //send response
        console.log(res.cookie())

        const {
            _id,
            name,
            email,
            role
        } = user;

        return res.json({
            token,
            user: {
                _id,
                name,
                email,
                role
            }
        });

    })


}
exports.signout = (req, res) => {
    res.send('user is signed out')
}