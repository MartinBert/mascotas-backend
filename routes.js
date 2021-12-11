const express = require('express');
const router = express.Router();
const auth = require('./middleware/auth');

module.exports = app => {
    router.use('/auth', auth.login);
    router.use('/usuarios', auth.verifyAuthentication, require('./controllers/usuario'));
    router.use('/productos', auth.verifyAuthentication, require('./controllers/producto'));
    router.use('/rubros', auth.verifyAuthentication, require('./controllers/rubro'));
    router.use('/marcas', auth.verifyAuthentication, require('./controllers/marca'));
    router.use('/salidas', auth.verifyAuthentication, require('./controllers/salida'));
    router.use('/cuentacorriente', auth.verifyAuthentication, require('./controllers/cuentacorriente'));
    router.use('/uploads', auth.verifyAuthentication, require('./controllers/uploader'));
    app.use('/api/v1/', router);
};