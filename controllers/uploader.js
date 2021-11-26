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
    destination: './front/uploads',
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

module.exports = router;