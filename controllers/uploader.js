'use strict'
const Model = require('../models/archivo')
const express = require('express')
const router = express.Router()
const multer = require('multer')
const crypto = require('crypto')
const path = require('path')
const fs = require('fs')

const errorResponse = (error) => {
    return {
        code: 500,
        message: 'Error',
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

// Delete image
router.delete('/:id', (request, response) => {
    Model.findOne({_id: request.query.id}, (error, item) => {
        if(error) return response.status(500).send(errorResponse(error))
        if(!item) return response.status(404).send(errorResponse('Item does not exit'))
        fs.unlink('public/uploads/' + item.filename, (err) => {
            if(err) return response.status(404).send(errorResponse('File is not in directory'))
            Model.deleteOne({_id: request.query.id}, {}, (error, deletedItem) => {
                if(error) return response.status(500).send(errorResponse(error))
                if(!deletedItem) return response.status(404).send(errorResponse('The item could not be removed'))
                return response.status(200).send(successResponse(deletedItem))
            })
        })
    })
})

// Get image url
router.get('/:id', (request, response) => {
    Model.findOne({ _id: request.query.id }, (error, item) => {
        if (error) return errorResponse(error)
        return response.status(200).send(item.url)
    })
})
// ------------ Save new image ------------ //
const storage = multer.diskStorage({
    destination: './public/uploads',
    filename: function (req, file, callback) {
        crypto.pseudoRandomBytes(16, function(err, raw) {
            if (err) return callback(err)
            callback(null, raw.toString('hex') + path.extname(file.originalname))
        })
    }
})
const upload = multer({storage:storage})

router.post('/', upload.single('file'), (request, response) => {
    if(!request.file || request.file.length < 1) return errorResponse('No se cargó ninguna imagen')
    request.file.url = request.protocol + '://' + request.get('host') + '/uploads/' + request.file.filename
    Model.insertMany(request.file, (error, item) => {
        if(error) return response.status(500).send(errorResponse(error))
        return response.status(200).send(successResponse(item))
    })
})

module.exports = router