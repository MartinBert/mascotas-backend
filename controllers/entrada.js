'use strict'
const express = require('express')
const Model = require('../models/entrada')
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

const successWithItems = (items) => {
    return {
        code: 200,
        message: 'OK',
        data: items
    }
}

// Delete entry
router.delete('/:id', (request, response) => {
    Model.deleteOne({ _id: request.params.id }, (error) => {
        if (error) {
            return response.status(500).send(errorResponse(error))
        }
        return response.status(200).send(successResponse)
    })
})

//Get entries list
router.get('/', (request, response) => {
    const populateParams = ['usuario']
    const sortParam = '_id'
    Model
        .paginate(
            generateQuery(request),
            paginationParams(request, populateParams, sortParam),
            (error, items) => {
                if (error) return response.status(500).json(errorResponse(error))
                return response.status(200).json(items)
            }
        )
})

// Get entry by id
router.get('/:id', (request, response) => {
    Model.findById(request.params.id).exec((error, item) => {
        if (error) return response.status(500).send(errorResponse(error))
        return response.status(200).send(successWithItems(item))
    })
})

// Get entries list id
router.get('/multiple/idList', (request, response) => {
    const { ids } = request.query
    const query = { _id: { $in: JSON.parse(ids) } }
    Model.find(query, (error, items) => {
        if (error) return response.status(500).json(errorResponse(error))
        return response.status(200).json(items)
    })
})

// Save new entry
router.post('/', (request, response) => {
    let item = new Model(request.body)
    item.save((error, item) => {
        if (error) return response.status(500).send(errorResponse(error))
        return response.status(200).send(successWithItems(item))
    })
})

// Edit entry
router.put('/', (request, response) => {
    let item = new Model(request.body)
    Model.findOneAndUpdate({ _id: item._id }, item, { new: true }, (error, item) => {
        if (error) return response.status(500).send(errorResponse(error))
        return response.status(200).send(successWithItems(item))
    })
})

module.exports = router