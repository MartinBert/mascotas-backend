'use strict';
const express = require('express');
const Model   = require('../models/unidadmedida');
const router  = express.Router();

const errorResponse = (error) => {
    return {
        code: 500,
        message: 'Error',
        printStackTrace: error
    }
}

const successResponse = {
    code: 200,
    message: 'OK'
}

//Save new unidadmedida
router.post('/', (request, response) => {
    let item = new Model(request.body);
    item.save((error) => {
        if (error) {
            return response.status(500).json(errorResponse(error));
        }
        return response.status(200).json(successResponse);
    });
});

//Get unidadmedida by id
router.get('/:id', (request, response) => {
    Model.findById(request.params.id).exec((error, item) => {
        if (error) return response.status(500).json(errorResponse(error));
        return response.status(200).json(item);
    });
});

//Get unidadmedida list
router.get('/', (request, response) => {
    const {page, limit, filters} = request.query;
    const query = JSON.parse(filters);
    Model.paginate((query) ? {nombre: new RegExp(query.nombre, 'i')} : {}, {
        page,
        limit,
    }, (error, items) => {
        if (error) return response.status(500).json(errorResponse(error));
        return response.status(200).json(items);
    })
});

//Get unidadmedida list id
router.get('/multiple/idList', (request, response) => {
    const {ids} = request.query;
    const query = {_id: {$in: JSON.parse(ids)}};
    Model.find(query, (error, items) => {
        if (error) return response.status(500).json(errorResponse(error));
        return response.status(200).json(items);
    })
});

//Get unidades medida by name
router.get('/name/:name', (request, response) => {
    Model.paginate({nombre: new RegExp(request.params.name, 'i')}, {
        page: 0,
        limit: 10,
    }, (error, items) => {
        if (error) return response.status(500).json(errorResponse(error));
        return response.status(200).json(items);
    })
});

//Update unidadmedida
router.put('/:id', (request, response) => {
    let item = new Model(request.body);
    Model.findOneAndUpdate({ _id: request.params.id }, item, { new: true }, (error) => {
        if (error) return response.status(500).json(errorResponse(error));
        return response.status(200).json(successResponse);
    });
});

//Delete unidadmedida
router.delete('/:id', (request, response) => {
    Model.deleteOne({_id: request.params.id}, (error) => {
        if (error) return response.status(500).json(errorResponse(error));
        return response.status(200).json(successResponse);
    });
});

module.exports = router;