const mongoose = require("mongoose"),
    Schema = mongoose.Schema,
    AddressSchema = mongoose.Schema({
        address: {
            type: String,
            default: '',
            required: true
        },
        city: {
            type: String,
            required: [true, 'City is Require'],
        },
        state: {
            type: String,
            required: [true, 'State is Require'],
        },
        country: {
            type: String,
            required: [true, 'Country is Require'],
        },
        pincode: {
            type: String,
            required: [true, 'Pincode is Require'],
        },
        userId: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: [true, 'userId is Require'],
        }
    }, {
            timestamps: true
        });
// Export Address Schema
module.exports = mongoose.model('Address', AddressSchema);;