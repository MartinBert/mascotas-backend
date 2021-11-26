'use strict';

const express = require('express'),
    router = express.Router(),
    auth = require('./controllers/auth');

module.exports = app => {
    router.use('/auth', auth.login);
    router.use('/checkToken/:token', auth.verifyAuthentication);
    router.use('/usuarios', require('./controllers/usuario'));
    router.use('/productos', require('./controllers/producto'));
    router.use('/rubros', require('./controllers/rubro'));
    router.use('/marcas', require('./controllers/marca'));
    router.use('/salidas', require('./controllers/salida'));
    router.use('/uploader', require('./controllers/uploader'));
    app.use('/api/v1/', router);
};