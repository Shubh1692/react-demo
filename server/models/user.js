const mongoose = require("mongoose"),
    UserSchema = mongoose.Schema({
        name: {
            type: String,
            default: '',
            required: true
        },
        email: {
            type: String,
            unique: [true, 'This email already registred.'],
            required: [true, 'Email Address is Require'],
        }
    }, {
            timestamps: true
        });
// Export User Schema
module.exports = mongoose.model('User', UserSchema);;