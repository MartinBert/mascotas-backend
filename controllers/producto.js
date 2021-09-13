'use strict';

const express = require('express');
const Model   = require('../models/producto');
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
    (query) ? console.log(query.marca) : console.log("nada")
    Model.paginate((query !== null) ? { 
        $or: [
            {nombre: new RegExp(query.nombre, "i")}, 
            {codigoBarras:  new RegExp(query.codigoBarras, "i")}, 
            {codigoProducto: new RegExp(query.codigoProducto, "i")}
        ],
        $and:[
            {$or: [
                {marca: query.marca},
                {rubro: query.rubro}
            ]}
        ]
    
    } : {}, {
        page,
        limit,
        populate: ['rubro', 'marca', 'imagenes']
    }, (error, items) => {
        if (error) {
            console.log(error);
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
    Model.remove({_id: request.params.id}, (error, item) => {
        if(error){
            return response.status(500).json({
                code: '500',
                marca: "Ha ocurrido un error",
                stacktrace: error
            });
        }
        return response.status(200).json(item);
    })
});

module.exports = router;