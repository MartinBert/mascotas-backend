'use strict'
const express = require('express')
const Model = require('../models/mediopago')
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

// Delete payment method
router.delete('/:id', (request, response) => {
    Model.deleteOne({ _id: request.params.id }, (error) => {
        if (error) return response.status(500).json(errorResponse(error))
        return response.status(200).json(successResponse)
    })
})

// Get payment method list
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

//Get payment method by id
router.get('/:id', (request, response) => {
    Model.findById(request.params.id).exec((error, item) => {
        if (error) return response.status(500).json(errorResponse(error))
        return response.status(200).json(item)
    })
})

//Get payment method list id
router.get('/multiple/idList', (request, response) => {
    const { ids } = request.query
    const query = { _id: { $in: JSON.parse(ids) } }
    Model.find(query, (error, items) => {
        if (error) return response.status(500).json(errorResponse(error))
        return response.status(200).json(items)
    })
})

//Save new payment method
router.post('/', (request, response) => {
    let item = new Model(request.body)
    item.save((error) => {
        if (error) {
            return response.status(500).json(errorResponse(error))
        }
        return response.status(200).json(successResponse)
    })
})

//Update payment method
router.put('/:id', (request, response) => {
    let item = new Model(request.body)
    Model.findOneAndUpdate({ _id: request.params.id }, item, { new: true }, (error) => {
        if (error) return response.status(500).json(errorResponse(error))
        return response.status(200).json(successResponse)
    })
})

module.exports = router