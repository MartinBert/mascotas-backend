const express = require('express');
const router = express.Router();
const auth = require('./middleware/auth');

module.exports = app => {
    router.use('/auth', auth.login);
    router.use('/usuarios', auth.verifyAuthentication, require('./controllers/usuario'));
    router.use('/clientes', auth.verifyAuthentication, require('./controllers/cliente'));
    router.use('/productos', auth.verifyAuthentication, require('./controllers/producto'));
    router.use('/rubros', auth.verifyAuthentication, require('./controllers/rubro'));
    router.use('/marcas', auth.verifyAuthentication, require('./controllers/marca'));
    router.use('/salidas', auth.verifyAuthentication, require('./controllers/salida'));
    router.use('/cuentacorriente', auth.verifyAuthentication, require('./controllers/cuentacorriente'));
    router.use('/documentos', auth.verifyAuthentication, require('./controllers/documento'));
    router.use('/mediospago', auth.verifyAuthentication, require('./controllers/mediopago'));
    router.use('/uploads', auth.verifyAuthentication, require('./controllers/uploader'));
    router.use('/sucursales', auth.verifyAuthentication, require('./controllers/sucursales'));
    app.use('/api/v1/', router);
};