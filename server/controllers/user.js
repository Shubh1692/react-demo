const User = require("../models/user");


async function saveUser(req, res) {
    try {
        const user = new User(req.body);
        await user.save();
        res.status(200).send({
            user
        });
    } catch (error) {
        res.status(400).send({
            error
        });
    }
}


async function getAllUsers(req, res) {
    try {
        const users = await User.find({}).sort({createdAt: -1});
        res.status(200).send({
            users
        });
    } catch (error) {
        res.status(400).send({
            error
        });
    }
}

async function updateUser(req, res) {
    try {
        const user = await User.findByIdAndUpdate(req.params.id, {
            $set: req.body
        }, {
            new: true
        });
        res.status(200).send({
            user
        });
    } catch (error) {
        res.status(400).send({
            error
        });
    }
}

async function deleteUser(req, res) {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        res.status(200).send({
            user
        });
    } catch (error) {
        res.status(400).send({
            error
        });
    }
}
module.exports = {
    saveUser,
    getAllUsers,
    updateUser,
    deleteUser
}