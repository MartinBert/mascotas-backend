'use strict';

const express = require('express');
const Archivo   = require('../models/archivo');
const producto = require('../models/producto');
const rubro = require('../models/rubro');
const Mensaje = require('../models/marca');
const router  = express.Router();
const multer  = require('multer');
const crypto  = require('crypto');
const path    = require('path');

//Upload images
const upload = multer({
    storage: multer.diskStorage({
        destination: './front/uploads',
        filename: function (req, file, callback) {
            crypto.pseudoRandomBytes(16, function(err, raw) {
                if (err) return callback(err);
                
                callback(null, raw.toString('hex') + path.extname(file.originalname));
            });
        },
    }),
    fileFilter: function (req, file, callback) {
        //Chequea que sea imagen
        var ext = path.extname(file.originalname);
        if(ext !== '.png' && ext !== '.jpg' && ext !== '.gif' && ext !== '.jpeg' && ext !== '.pdf' && ext != '.docx') {
            return callback(null,false)
        }
        callback(null, true)
    },
});

router.post('/uploadFile', upload.array('files', 12), (request, response) => {
    if(!request.files || request.files.length == 0) {
        return response.status(400).json({
            code: '400',
            marca: 'No se paso ninguna imagen',
            stacktrace: null
        });
    }

    let files = request.files.map(function(item) {
        return {
            url: request.protocol + '://' + request.get('host') + '/uploads/' + item.filename,
            filename: item.filename,
            mimetype: item.mimetype,
            size: item.size,
            originalname: item.originalname
        }
    });

    Archivo.insertMany(files, function(error, docs) {
        if(error) {
            return response.status(500).json({
                code: '500',
                marca: "Ha ocurrido un error",
                stacktrace: error
            });
        }

        return response.status(200).json(docs);
    })
})

//Get objects
//All
router.get('/productos', (request, response)=>{
    producto.find()
    .sort({'updatedAt': -1})
    .populate('imagenes', 'filename url')
    .exec((error, items) => {
        if (error) {
            return response.status(500).json({
                code: '500',
                marca: "Ha ocurrido un error",
                stacktrace: error
            });
        }

        return response.status(200).json(items);
    });
})

router.get('/rubros', (request, response)=>{
    rubro.find()
    .sort({'updatedAt': -1})
    .exec((error, items) => {
        if (error) {
            return response.status(500).json({
                code: '500',
                marca: "Ha ocurrido un error",
                stacktrace: error
            });
        }

        return response.status(200).json(items);
    });
})

router.get('/rubros/:id', (request, response)=>{
    rubro.findById(request.params.id)
    .exec((error, items) => {
        if (error) {
            return response.status(500).json({
                code: '500',
                marca: "Ha ocurrido un error",
                stacktrace: error
            });
        }

        return response.status(200).json(items);
    });
})

//By Id
router.get('/producto/:id', (request, response)=>{
    producto.findById(request.params.id).populate('imagenes', 'filename url').populate('producto', 'telefono facebook instagram nombre historia telefonoFijo').exec((error, items) => {
        if (error) {
            return response.status(500).json({
                code: '500',
                marca: "Ha ocurrido un error",
                stacktrace: error
            });
        }

        return response.status(200).json(items);
    });
})
//-->

//Post marca
router.post('/save', (request, response) => {
    var item = new Mensaje(request.body);
    item.save((error) => {
        if (error) {
            return response.status(500).json({
                code: '500',
                marca: "Ha ocurrido un error",
                stacktrace: error
            });
        }else{
            return response.status(200).json(item);
        }
    });
});
//-->

module.exports = router;