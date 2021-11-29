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

const successWithItems = (items) => {
    return {
        code: 200,
        message: 'OK',
        data: items
    }
}

router.post('/', (request, response) => {
    let item = new Model(request.body);
    item.save((error) => {
        if (error) return response.status(500).json(errorResponse(error));
        return response.status(200).json(successResponse);
    });
});

router.get('/:id', (request, response) => {
    Model.findById(request.params.id).exec((error, item) => {
        if (error) return response.status(500).json(errorResponse(error));
        return response.status(200).json(successWithItems(item));
    });
});

router.get('/', (request, response) => {
    const {page, limit, filters} = request.query;
    const query = JSON.parse(filters);
    
    if(query){
        const queryKeys = Object.keys(query);
        queryKeys.forEach(key => {
            if(key !== 'marca' && key !== 'rubro'){
                query[key] = new RegExp(query[key], 'i')
            }
        })
    }

    Model.paginate((query !== null) ? query : {}, {
        page,
        limit,
        populate: ['rubro', 'marca']
    }, (error, items) => {
        if (error) {
            return response.status(500).json(errorResponse(error));
        }
        return response.status(200).send(items);
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