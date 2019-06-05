const mongoose = require("mongoose"),
    Schema = mongoose.Schema,
    AlbumSchema = mongoose.Schema({
        name: {
            type: String,
            default: '',
            required: true
        },
        type: {
            type: String,
            required: [true, 'Type is Require'],
            enum: ['album', 'image']
        },
        imageUrl: {
            type: String,
        },
        parentId: {
            type: Schema.Types.ObjectId,
            ref: 'Album',
            required: [true, 'Parent id is Require'],
        },
        userId: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: [true, 'userId is Require'],
        }
    }, {
            timestamps: true
        });
// Export Album Schema
module.exports = mongoose.model('Album', AlbumSchema);;