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

// Delete business statistics
router.delete('/:id', (request, response) => {
    Model.deleteOne({ _id: request.params.id }, (error) => {
        if (error) return response.status(500).json(errorResponse(error))
        return response.status(200).json(successResponse)
    })
})

// Get business statistics
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

// Save business statistics
router.post('/', (request, response) => {
    let item = new Model(request.body)
    item.save(error => {
        if (error) return response.status(500).json(errorResponse(error))
        return response.status(200).json(successResponse)
    })
})

// Update business statistics
router.put('/:id', (request, response) => {
    let item = new Model(request.body)
    Model.findOneAndUpdate({ _id: request.body._id }, item, { new: true }, (error) => {
        if (error) return response.status(500).json(errorResponse(error))
        return response.status(200).json(successResponse)
    })
})

module.exports = router