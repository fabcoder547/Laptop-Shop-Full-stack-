const User = require('../models/user')

const { check, validationResult } = require('express-validator');


exports.signup = (req, res) => {
    console.log(req.header);

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors })
    }
    const user = new User(req.body);
    user.save((err, user) => {
        if (err) {
            return res.status(400).json({ msg: "User is Not able to save in a database" })
        }
        res.json({ name: user.name, lastname: user.lastname, email: user.email })
    })


}
exports.signout = (req, res) => {
    res.send('user is signed out')
}