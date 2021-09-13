'use strict';

const express = require('express');
const Model   = require('../models/salida');
const Usuario = require('../models/usuario');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const JWTstrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;
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
    const {page, limit, filters} = request.query;
    const query = JSON.parse(filters);
    Model.paginate(query, {
        page,
        limit,
        populate: ['usuario', 'productos']
    }, (error, items) => {
        if (error) {
            return response.status(500).json({
                code: '500',
                marca: "Ha ocurrido un error",
                stacktrace: error
            });
        }
        return response.status(200).json(items);
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