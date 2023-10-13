'use strict'
const express = require('express')
const Model = require('../models/zonadeventa')
const router = express.Router()
const {
    generateQuery,
    paginationParams
} = require('../helpers/controllersHelper')

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

// Delete Sale Area
router.delete('/:id', (request, response) => {
    Model
        .deleteOne({ _id: request.params.id }, (error) => {
            if (error) return response.status(500).json(errorResponse(error))
            return response.status(200).json(successResponse)
        })
})

// Get Sales Areas list
router.get('/', (request, response) => {
    const sortParams = {param: 'name', direction: 1}
    Model
        .paginate(
            generateQuery(request),
            paginationParams(request, null, sortParams),
            (error, items) => {
                if (error) return response.status(500).json(errorResponse(error))
                return response.status(200).json(items)
            }
        )
})

// Get Sale Area by id
router.get('/:id', (request, response) => {
    Model
        .findById(request.params.id)
        .exec((error, item) => {
            if (error) return response.status(500).json(errorResponse(error))
            return response.status(200).json(item)
        })
})

// Get business by name
router.get('/name/:name', (request, response) => {
    Model.paginate({ name: new RegExp(request.params.name, 'i') }, {
        page: 0,
        limit: 10,
    }, (error, items) => {
        if (error) return response.status(500).json(errorResponse(error))
        return response.status(200).json(items)
    })
})

// Save new Sale Area
router.post('/', (request, response) => {
    let item = new Model(request.body)
    item
        .save(error => {
            if (error) return response.status(500).json(errorResponse(error))
            return response.status(200).json(successResponse)
        })
})

// Update Sale Area
router.put('/:id', (request, response) => {
    let item = new Model(request.body)
    Model
        .findOneAndUpdate({ _id: request.body._id }, item, { new: true }, (error) => {
            if (error) return response.status(500).json(errorResponse(error))
            return response.status(200).json(successResponse)
        })
})

module.exports = router