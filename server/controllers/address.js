const Address = require("../models/address");


async function saveAddress(req, res) {
    try {
        const address = new Address(req.body);
        await address.save();
        res.status(200).send({
            address
        });
    } catch (error) {
        res.status(400).send({
            error
        });
    }
}


async function getAllAddresses(req, res) {
    try {
        const addresses = await Address.find({
            userId: req.params.userId
        }).sort({createdAt: -1});
        res.status(200).send({
            addresses
        });
    } catch (error) {
        res.status(400).send({
            error
        });
    }
}

async function updateAddress(req, res) {
    try {
        delete req.body.userId;
        const address = await Address.findByIdAndUpdate(req.params.id, {
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

async function deleteAddress(req, res) {
    try {
        const address = await Address.findByIdAndDelete(req.params.id);
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
    saveAddress,
    getAllAddresses,
    updateAddress,
    deleteAddress
}