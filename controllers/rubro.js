'use strict';

const express = require('express');
const Model   = require('../models/rubro');
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

//Save new rubro
router.post('/', (request, response) => {
    let item = new Model(request.body);
    item.save((error) => {
        if (error) {
            return response.status(500).json(errorResponse(error));
        }
        return response.status(200).json(successResponse);
    });
});

//Get rubro by id
router.get('/:id', (request, response) => {
    Model.findById(request.params.id).exec((error, item) => {
        if (error) return response.status(500).json(errorResponse(error));
        return response.status(200).json(item);
    });
});

//Get rubros list
router.get('/', (request, response) => {
    const {page, limit, filters} = request.query;
    const query = JSON.parse(filters);
    Model.paginate(query, {
        page,
        limit,
    }, (error, items) => {
        if (error) return response.status(500).json(errorResponse(error));
        return response.status(200).json(items);
    })
});

//Get rubros by name
router.get('/name/:name', (request, response) => {
    console.log(request.params.name);
    Model.paginate({nombre: new RegExp(request.params.name)}, {
        page: 0,
        limit: 10,
    }, (error, items) => {
        if (error) return response.status(500).json(errorResponse(error));
        return response.status(200).json(items);
    })
});

//Update rubro
router.put('/:id', (request, response) => {
    let item = new Model(request.body);
    Model.findOneAndUpdate({ _id: request.params.id }, item, { new: true }, (error) => {
        if (error) return response.status(500).json(errorResponse(error));
        return response.status(200).json(successResponse);
    });
});

//Delete rubro
router.delete('/:id', (request, response) => {
    Model.deleteOne({_id: request.params.id}, (error) => {
        if (error) return response.status(500).json(errorResponse(error));
        return response.status(200).json(successResponse);
    });
});

module.exports = router;