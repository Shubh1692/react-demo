
const multer = require('multer'),
    path = require('path'),
    Album = require("../models/album"),
    storage = multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, 'uploads')
        },
        filename: function (req, file, cb) {
            const ext = path.extname(file.originalname)
            cb(null, `${file.fieldname}${Date.now()}${ext}`)
        },
        fileFilter: function (req, file, callback) {
            const ext = path.extname(file.originalname)
            const allowedFilesExt = ['.png', '.jpg', '.gif', '.jpeg'];
            if (allowedFilesExt.includes(ext)) {
                return callback('Only images are allowed', null)
            }
            callback(null, true);
        }
    })

const upload = multer({ storage: storage }).single('album');

async function uploadImage(req, res, next) {
    console.log(req.body)
    const file = req.file;
    if (!file) {
        const error = new Error('Please choose image')
        error.httpStatusCode = 400
        return next(error)
    }
    const {parentId, userId } = req.body;
    const albumObj = {
        name: file.filename,
        type: 'image',
        userId,
        parentId
    };
    const album = new Album(albumObj);
    await album.save();
    res.status(200).send({
        album
    });
}

module.exports = {
    uploadImage,
    upload
}