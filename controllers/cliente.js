'use strict'
const express = require('express')
const Model = require('../models/cliente')
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

// Delete cliente
router.delete('/:id', (request, response) => {
    Model.deleteOne({ _id: request.params.id }, (error) => {
        if (error) return response.status(500).json(errorResponse(error))
        return response.status(200).json(successResponse)
    })
})

// Get clients list
router.get('/', (request, response) => {
    const populateParams = ['condicionFiscal']
    Model
        .paginate(
            generateQuery(request),
            paginationParams(request, populateParams),
            (error, items) => {
                if (error) return response.status(500).json(errorResponse(error))
                return response.status(200).json(items)
            }
        )
})

// Get cliente by id
router.get('/:id', (request, response) => {
    Model.findById(request.params.id).populate('condicionFiscal').exec((error, item) => {
        if (error) return response.status(500).json(errorResponse(error))
        return response.status(200).json(item)
    })
})

// Get clients list id
router.get('/multiple/idList', (request, response) => {
    const { ids } = request.query
    const query = { _id: { $in: JSON.parse(ids) } }
    Model.find(query, (error, items) => {
        if (error) return response.status(500).json(errorResponse(error))
        return response.status(200).json(items)
    })
})

// Save new cliente
router.post('/', (request, response) => {
    let item = new Model(request.body)
    item.save((error) => {
        if (error) {
            return response.status(500).json(errorResponse(error))
        }
        return response.status(200).json(successResponse)
    })
})

// Update cliente
router.put('/:id', (request, response) => {
    let item = new Model(request.body)
    Model.findOneAndUpdate({ _id: request.body._id }, item, { new: true }, (error) => {
        if (error) return response.status(500).json(errorResponse(error))
        return response.status(200).json(successResponse)
    })
})

module.exports = router