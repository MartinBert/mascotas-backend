'use strict'
const express = require('express')
const Model = require('../models/usuario')
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

// Delete user
router.delete('/:id', (request, response) => {
    Model.deleteOne({ _id: request.params.id }, (error) => {
        if (error) return response.status(500).json(errorResponse(error))
        return response.status(200).json(successResponse)
    })
})

// Get users list
router.get('/', (request, response) => {
    Model
        .paginate(
            generateQuery(request),
            paginationParams(request),
            (error, items) => {
                if (error) return response.status(500).json(errorResponse(error))
                return response.status(200).json(items)
            }
        )
})

// Get user by id
router.get('/:id', (request, response) => {
    Model
        .findById(request.params.id)
        .populate([{
            path: 'empresa',
            populate: ['condicionFiscal', 'logo']
        }])
        .populate(['puntoVenta'])
        .exec((error, item) => {
            if (error) return response.status(500).json(errorResponse(error))
            return response.status(200).json(item)
        })
})

// Get usuarios list id
router.get('/multiple/idList', (request, response) => {
    const { ids } = request.query
    const query = { _id: { $in: JSON.parse(ids) } }
    Model.find(query, (error, items) => {
        if (error) return response.status(500).json(errorResponse(error))
        return response.status(200).json(items)
    })
})

// Get users by name
router.get('/name/:name', (request, response) => {
    Model.paginate({ nombre: new RegExp(request.params.name) }, {
        page: 0,
        limit: 10,
        populate: ['empresa', 'puntoVenta']
    }, (error, items) => {
        if (error) return response.status(500).json(errorResponse(error))
        return response.status(200).json(items)
    })
})

// Save new user
router.post('/', (request, response) => {
    let item = new Model(request.body)
    item.save((error) => {
        if (error) {
            return response.status(500).json(errorResponse(error))
        }
        return response.status(200).json(successResponse)
    })
})

// Update user
router.put('/:id', (request, response) => {
    let item = new Model(request.body)
    Model.findOneAndUpdate({ _id: request.params.id }, item, { new: true }, (error) => {
        if (error) return response.status(500).json(errorResponse(error))
        return response.status(200).json(successResponse)
    })
})

module.exports = router