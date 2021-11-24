'use strict';

const express = require('express');
const Model   = require('../models/producto');
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

router.post('/', (request, response) => {
    let item = new Model(request.body);
    item.save((error) => {
        if (error) {
            return response.status(500).json(errorResponse(error));
        }
        return response.status(200).json(successResponse);
    });
});

router.get('/:id', (request, response) => {
    Model.findById(request.params.id).exec((error) => {
        if (error) {
            return response.status(500).json(errorResponse(error));
        }
        return response.status(200).json(successResponse);
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
    }, (error) => {
        if (error) {
            return response.status(500).json(errorResponse(error));
        }
        return response.status(200).json(successResponse);
    })
});

router.put('/:id', (request, response) => {
    let item = new Model(request.body);
    Model.findOneAndUpdate({ _id: request.params.id }, item, { new: true }, (error) => {
        if (error) {
            return response.status(500).json(errorResponse(error));
        }
        return response.status(200).json(successResponse);
    });
});

router.delete('/:id', (request, response) => {
    Model.remove({_id: request.params.id}, (error) => {
        if(error){
            return response.status(500).json(errorResponse(error));
        }
        return response.status(200).json(successResponse);
    })
});

module.exports = router;