'use strict';

const express = require('express');
const Model   = require('../models/marca');
const Usuario = require('../models/usuario');
const jwt = require('jsonwebtoken');
const config = require("../config/index");
const router  = express.Router();

router.post('/', (request, response) => {
    let item = new Model(request.body);
    item.save((error, item) => {
        if (error) {
            return response.status(500).json({
                code: '500',
                marca: "Ha ocurrido un error",
                stacktrace: error
            });
        }

        return response.status(201).json(item);
    });
});

router.get('/:id', (request, response) => {
    Model.findById(request.params.id).exec((error, item) => {
        if (error) {
            return response.status(500).json({
                code: '500',
                marca: "Ha ocurrido un error",
                stacktrace: error
            });
        }
        return response.status(200).json(item);
    });
});

router.get('/', (request, response) => {
    var auth = request.headers.authorization;
    var token = auth.replace("Bearer ", "");
    jwt.verify(token,config.jwt.secretKey, function(err,decode) {
        if(err) {
            return res.status(401).json({
                status: 401,
                marca: 'El token no es valido'
            });
        }

        Usuario.findById(decode._id, (error, user) => {
            if(error) return done(error, false);
    
            if(user) {
                if(user.perfil){
                    Model.find()
                    .sort({'nombre': 1})
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
                }
                else{
                    Model.find()
                    .sort({'nombre': 1})
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
                }
    
            } else {
                done(null, false);
            }
        });  
    })
    
});

router.put('/:id', (request, response) => {
    let item = new Model(request.body);
    Model.findOneAndUpdate({ _id: request.params.id }, item, { new: true }, (error, item) => {
        if (error) {
            return response.status(500).json({
                code: '500',
                marca: "Ha ocurrido un error",
                stacktrace: error
            });
        }

        return response.status(200).json(item);
    });
});

router.delete('/:id', (request, response) => {
    Model.findById(request.params.id, function (error, item) {
        if (error) {
            return response.status(500).json({
                code: '500',
                marca: "Ha ocurrido un error",
                stacktrace: error
            });
        }

        item.remove((error, item) => {
            if (error) {
                return response.status(500).json({
                    code: '500',
                    marca: "Ha ocurrido un error",
                    stacktrace: error
                });
            }

            return response.status(204).json({
                code: '204',
                marca: "Se ha eliminado con éxito"
            });
        });
    });
});

module.exports = router;