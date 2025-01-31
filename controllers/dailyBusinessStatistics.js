'use strict'
const express = require('express')
const Model = require('../models/dailyBusinessStatistic')
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


// Delete all daily business statistics
router.delete('/', (request, response) => {
    Model.deleteMany({}, (error) => {
        if (error) return response.status(500).json(errorResponse(error))
        return response.status(200).json(successResponse)
    })
})

// Delete business statistics
router.delete('/:id', (request, response) => {
    Model.deleteOne({ _id: request.params.id }, (error) => {
        if (error) return response.status(500).json(errorResponse(error))
        return response.status(200).json(successResponse)
    })
})

// Get business statistics
router.get('/', (request, response) => {
    const sortParams = { dateOrder: -1 }
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

// Get business statistics by id
router.get('/:id', (request, response) => {
    Model.findById(request.params.id).exec((error, item) => {
        if (error) return response.status(500).send(errorResponse(error))
        return response.status(200).send(successWithItems(item))
    })
})

// Get newer business statistics
router.get('/recordsInfo/newer', (request, response) => {
    Model
        .find({})
        .sort({ 'date': -1 })
        .limit(1)
        .exec((error, item) => {
            if (error) return response.status(500).json(errorResponse(error))
            return response.status(200).json(item)
        })
})

// Get oldest business statistics
router.get('/recordsInfo/oldest', (request, response) => {
    Model
        .find({})
        .sort({ 'date': 1 })
        .limit(1)
        .exec((error, item) => {
            if (error) return response.status(500).json(errorResponse(error))
            return response.status(200).json(item)
        })
})

// Save one single business statistic
router.post('/', (request, response) => {
    let item = new Model(request.body)
    item.save(error => {
        if (error) return response.status(500).json(errorResponse(error))
        return response.status(200).json(successResponse)
    })
})

// Save more than one business statistics
router.post('/statistics/save_all', (request, response) => {
    Model.insertMany(request.body, (error) => {
        if (error) return response.status(500).json(errorResponse(error))
        return response.status(200).json(successResponse)
    })
})

// Update business statistics
router.put('/:id', (request, response) => {
    let item = new Model(request.body)
    Model.findByIdAndUpdate(
        request.body._id,
        request.body,
        { new: true }, (error) => {
            if (error) return response.status(500).json(errorResponse(error))
            return response.status(200).json(successWithItems(item))
        })
})

module.exports = router