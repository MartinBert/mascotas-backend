'use strict'
const express = require('express')
const Model = require('../models/stockHistory')
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


// Delete stock history
router.delete('/:id', (request, response) => {
    Model.deleteOne({ _id: request.params.id }, (error) => {
        if (error) return response.status(500).json(errorResponse(error))
        return response.status(200).json(successResponse)
    })
})

// Get stock history
router.get('/', (request, response) => {
    const sortParams = { param: 'date', direction: -1 }
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

// Get stock history by id
router.get('/:id', (request, response) => {
    Model.findById(request.params.id).exec((error, item) => {
        if (error) return response.status(500).send(errorResponse(error))
        return response.status(200).send(successWithItems(item))
    })
})

// Get newer stock history
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

// Get oldest stock history
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

// Save stock history
router.post('/', (request, response) => {
    let item = new Model(request.body)
    item.save(error => {
        if (error) return response.status(500).json(errorResponse(error))
        return response.status(200).json(successResponse)
    })
})

// Update stock history
router.put('/:id', (request, response) => {
    let item = new Model(request.body)
    Model.findByIdAndUpdate(
        request.body._id,
        // {
        //     dailyExpense: request.body.dailyExpense,
        //     dailyIncome: request.body.dailyIncome,
        //     dailyProfit: request.body.dailyProfit
        // },
        { new: true }, (error) => {
            if (error) return response.status(500).json(errorResponse(error))
            return response.status(200).json(successWithItems(item))
        })
})

module.exports = router