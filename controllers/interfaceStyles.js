'use strict'
const express = require('express')
const Model = require('../models/interfaceStyles')
const router = express.Router()

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

// Get interface styles
router.get('/', (request, response) => {
    Model.find().exec((error, item) => {
        if (error) return response.status(500).json(errorResponse(error))
        return response.status(200).json(item)
    })
})

// Save interface styles
router.post('/', (request, response) => {
    let item = new Model(request.body)
    item.save((error) => {
        if (error) return response.status(500).json(errorResponse(error))
        return response.status(200).json(successResponse)
    })
})

// Update interface styles
router.put('/:id', (request, response) => {
    let item = new Model(request.body)
    Model.findOneAndUpdate({ _id: request.body._id }, item, { new: true }, (error) => {
        if (error) return response.status(500).json(errorResponse(error))
        return response.status(200).json(successResponse)
    })
})

module.exports = router