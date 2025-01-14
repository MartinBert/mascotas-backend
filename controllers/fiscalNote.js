'use strict'
const express = require('express')
const Model = require('../models/fiscalNote')
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

// Delete fiscal note
router.delete('/:id', (request, response) => {
    Model.deleteOne({ _id: request.params.id }, (error) => {
        if (error) return response.status(500).json(errorResponse(error))
        return response.status(200).json(successResponse)
    })
})

// Get fiscal notes list
router.get('/', (request, response) => {
    const populateParams = ['documento', 'renglones', 'usuario']
    const sortParams = { index: -1 }
    Model
        .paginate(
            generateQuery(request),
            paginationParams(request, populateParams, sortParams),
            (error, items) => {
                if (error) return response.status(500).json(errorResponse(error))
                return response.status(200).json(items)
            }
        )
})

// Get fiscal note by id
router.get('/:id', (request, response) => {
    Model
        .findById(request.params.id)
        .populate(['documento', 'renglones', 'usuario'])
        .exec((error, item) => {
            if (error) return response.status(500).json(errorResponse(error))
            return response.status(200).json(item)
        })
})

// Get last index of fiscal note
router.get('/last/index/number', (request, response) => {
    Model
        .findOne()
        .sort('-indice')
        .exec((error, item) => {
            if (error) return response.status(500).json(errorResponse(error))
            return response.status(200).json((item) ? item.indice : 0)
        })
})

// Get last fiscal note code
router.get('/last/fiscalNote/number/:code', (request, response) => {
    Model
        .findOne({ documentoCodigo: request.params.code })
        .sort('-indice')
        .exec((error, item) => {
            if (error) return response.status(500).json(errorResponse(error))
            return response.status(200).json((item) ? item.numeroFactura : 0)
        })
})

//Get fiscal notes list id
router.get('/multiple/idList', (request, response) => {
    const { ids } = request.query
    const query = { _id: { $in: JSON.parse(ids) } }
    Model
        .find(query)
        .populate(['documento', 'renglones', 'usuario'])
        .exec((error, items) => {
            if (error) return response.status(500).json(errorResponse(error))
            return response.status(200).json(items)
        })
})

// Save new fiscal note
router.post('/', (request, response) => {
    let item = new Model(request.body)
    item.save((error, item) => {
        if (error) return response.status(500).send(errorResponse(error))
        return response.status(200).send(successWithItems(item))
    })
})

// Update fiscal note
router.put('/:id', (request, response) => {
    let item = new Model(request.body)
    Model.findOneAndUpdate({ _id: request.params.id }, item, { new: true }, (error) => {
        if (error) return response.status(500).json(errorResponse(error))
        return response.status(200).json(successResponse)
    })
})

module.exports = router