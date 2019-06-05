const Album = require("../models/album");


async function saveAlbum(req, res) {
    try {
        const album = new Album(req.body);
        await album.save();
        res.status(200).send({
            album
        });
    } catch (error) {
        res.status(400).send({
            error
        });
    }
}


async function getAllAlbums(req, res) {
    try {
        const albums = await Album.find({
            parentId: req.params.parentId
        }).sort({createdAt: -1});
        res.status(200).send({
            albums
        });
    } catch (error) {
        res.status(400).send({
            error
        });
    }
}


async function updateAlbum(req, res) {
    try {
        delete req.body.userId;
        const address = await Album.findByIdAndUpdate(req.params.id, {
            $set: req.body
        }, {
                new: true
            });
        res.status(200).send({
            address
        });
    } catch (error) {
        res.status(400).send({
            error
        });
    }
}

async function deleteAlbum(req, res) {
    try {
        const address = await Album.findByIdAndDelete(req.params.id);
        res.status(200).send({
            address
        });
    } catch (error) {
        res.status(400).send({
            error
        });
    }
}

module.exports = {
    saveAlbum,
    getAllAlbums,
    updateAlbum,
    deleteAlbum
}