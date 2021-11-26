const Model = require('../models/archivo');
const express = require('express');
const router  = express.Router();
const multer  = require('multer');
const crypto  = require('crypto');
const path    = require('path');

const errorResponse = (error) => {
    return {
        code: 500,
        message: "Error",
        printStackTrace: error
    }
}

const successResponse = (file) => {
    return {
        code: 200,
        message: 'OK',
        file: file
    }
}

const storage = multer.diskStorage({
    destination: './public/uploads',
    filename: function (req, file, callback) {
        crypto.pseudoRandomBytes(16, function(err, raw) {
            if (err) return callback(err);
            callback(null, raw.toString('hex') + path.extname(file.originalname));
        });
    }
})

const upload = multer({storage:storage});

router.post('/', upload.single('file'), (request, response) => {
    if(!request.file) return errorResponse('No se cargó ninguna imagen');
    return response.status(200).send(successResponse());
});

router.get('/:id', (request, response) => {
    Model.findOne({ _id: request.params.id }, (error, item) => {
        if (error) return errorResponse(error);
        return response.status(200).send(item.url);
    })
});

module.exports = router;