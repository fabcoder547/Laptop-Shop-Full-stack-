const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const crypto = require('crypto');
const uuidv1 = require('uuid/v1');
const userSchema = new Schema({

    name: {
        type: String,
        required: true,
        trim: true,
        maxlength: 30
    },
    lastname: {
        type: String,

        trim: true,
        maxlength: 30
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true

    },

    encry_password: {
        type: String,
        required: true,
        trim: true
    },
    salt: String,
    role: {
        type: Number,
        default: 0

    },
    purchases: {
        type: Array,
        default: []
    },
    userinfo: {
        type: String,
        trim: true

    }


}, { timestamps: true });

userSchema.methods = {

    authenticate: function(plainpassword) {
        if (this.securePassword(plainpassword) == this.encry_password)
            return true;
        else {
            return false;
        }
    },

    securePassword: function(plainpassword) {
        if (!plainpassword)
            return ""

        try {

            return crypto.createHmac('sha256', this.salt).update(plainpassword).digest('hex');
        } catch (err) {
            return ""
        }
    }


}


userSchema.virtual("password").set(function(plainpassword) {

    this._password = plainpassword;
    this.salt = uuidv1();
    this.encry_password = this.securePassword(plainpassword)

}).get(function() {
    return this._password;
})


module.exports = mongoose.model('myuser', userSchema);