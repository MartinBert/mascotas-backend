'use strict';
const express = require('express');
const Model   = require('../models/empresa');
const router  = express.Router();

const errorResponse = (error) => {
    return {
        code: 500,
        message: "Error",
        printStackTrace: error
    }
}

const successResponse = {
    code: 200,
    message: 'OK'
}

//Save new empresa
router.post('/', (request, response) => {
    let item = new Model(request.body);
    item.save((error) => {
        if (error) {
            return response.status(500).json(errorResponse(error));
        }
        return response.status(200).json(successResponse);
    });
});

//Get empresa by id
router.get('/:id', (request, response) => {
    Model.findById(request.params.id)
    .populate('logo')
    .populate('puntosVenta')
    .populate('condicionFiscal')
    .exec((error, item) => {
        if (error) return response.status(500).json(errorResponse(error));
        return response.status(200).json(item);
    });
});

//Get empresas list
router.get('/', (request, response) => {
    const {page, limit, filters} = request.query;
    const query = JSON.parse(filters);
    Model.paginate((query) ? {nombre: new RegExp(query.nombre, 'i')} : {}, {
        page,
        limit,
        populate: ['logo', 'puntosVenta', 'condicionFiscal']
    }, (error, items) => {
        if (error) return response.status(500).json(errorResponse(error));
        return response.status(200).json(items);
    })
});

//Get empresas list id
router.get('/multiple/idList', (request, response) => {
    const {ids} = request.query;
    const query = {_id: {$in: JSON.parse(ids)}};
    Model.find(query, (error, items) => {
        if (error) return response.status(500).json(errorResponse(error));
        return response.status(200).json(items);
    })
});

//Get empresas by name
router.get('/name/:name', (request, response) => {
    Model.paginate({nombre: new RegExp(request.params.name, 'i')}, {
        page: 0,
        limit: 10,
    }, (error, items) => {
        if (error) return response.status(500).json(errorResponse(error));
        return response.status(200).json(items);
    })
});

//Update empresa
router.put('/:id', (request, response) => {
    let item = new Model(request.body);
    Model.findOneAndUpdate({ _id: request.params.id }, item, { new: true }, (error) => {
        if (error) return response.status(500).json(errorResponse(error));
        return response.status(200).json(successResponse);
    });
});

//Delete empresa
router.delete('/:id', (request, response) => {
    Model.deleteOne({_id: request.params.id}, (error) => {
        if (error) return response.status(500).json(errorResponse(error));
        return response.status(200).json(successResponse);
    });
});

module.exports = router;