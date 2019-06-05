const userRouter = require('express').Router(),
    addressRouter = require('express').Router(),
    albumRouter = require('express').Router(),
    uploadRouter= require('express').Router(),
    { getAllUsers, saveUser, updateUser, deleteUser } = require('../server/controllers/user'),
    { getAllAddresses, saveAddress, updateAddress, deleteAddress } = require('../server/controllers/address'),
    { getAllAlbums, saveAlbum, updateAlbum, deleteAlbum } = require('../server/controllers/album'),
    { uploadImage, upload } = require('../server/controllers/upload');

module.exports = (app) => {
    userRouter.route('/').get(getAllUsers);
    userRouter.route('/').post(saveUser);
    userRouter.route('/:id').put(updateUser);
    userRouter.route('/:id').delete(deleteUser);
    addressRouter.route('/:userId').get(getAllAddresses);
    addressRouter.route('/').post(saveAddress);
    addressRouter.route('/:id').put(updateAddress);
    addressRouter.route('/:id').delete(deleteAddress)
    albumRouter.route('/:parentId').get(getAllAlbums);
    albumRouter.route('/').post(saveAlbum);
    albumRouter.route('/:id').put(updateAlbum);
    albumRouter.route('/:id').delete(deleteAlbum);
    uploadRouter.route('/').post(upload, uploadImage);
    app.use('/user/', userRouter);
    app.use('/address/', addressRouter);
    app.use('/album/', albumRouter);
    app.use('/upload/', uploadRouter);
}
