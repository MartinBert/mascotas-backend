'use strict'
const express = require('express')
const Model = require('../models/producto')
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

// Delete product
router.delete('/:id', (request, response) => {
    Model.deleteOne({ _id: request.params.id }, (error) => {
        if (error) return response.status(500).send(errorResponse(error))
        return response.status(200).send(successResponse)
    })
})

// Get products list
router.get('/', (request, response) => {
    const populateParams = ['rubro', 'marca', 'imagenes', 'unidadMedida']
    const sortParams = {param: '_id', direction: -1}
    Model
        .paginate(
            generateQuery(request),
            paginationParams(request, populateParams, sortParams),
            (error, items) => {
                if (error) return response.status(500).json(errorResponse(error))
                return response.status(200).json(items)
            })
})

// Get product by id
router.get('/:id', (request, response) => {
    Model.findById(request.params.id)
        .populate(['imagenes', 'marca', 'rubro', 'unidadMedida'])
        .exec((error, item) => {
            if (error) return response.status(500).send(errorResponse(error))
            return response.status(200).send(successWithItems(item))
        })
})

// Get product by barcode
router.get('/barcode/:barcode', (request, response) => {
    Model.findOne({ codigoBarras: request.params.barcode }).exec((error, item) => {
        if (error) return response.status(500).send(errorResponse(error))
        return response.status(200).send(successWithItems(item))
    })
})

// Get productos list id
router.get('/multiple/idList', (request, response) => {
    const { ids } = request.query
    const query = { _id: { $in: JSON.parse(ids) } }
    Model.find(query, (error, items) => {
        if (error) return response.status(500).json(errorResponse(error))
        return response.status(200).json(items)
    })
})

// Verify if exists records of products
router.get('/recordsInfo/quantity', (request, response) => {
    Model.estimatedDocumentCount((error, numOfDocs) => {
        if (error) return response.status(500).json(errorResponse(error))
        return response.status(200).json(numOfDocs)
    })
})

// Edit product
router.put('/', (request, response) => {
    let item = new Model(request.body)
    Model.findOneAndUpdate({ _id: item._id }, item, { new: true }, (error) => {
        if (error) {
            return response.status(500).send(errorResponse(error))
        }
        return response.status(200).send(successResponse)
    })
})

// Save new product
router.post('/', (request, response) => {
    let item = new Model(request.body)
    item.save((error) => {
        if (error) return response.status(500).send(errorResponse(error))
        return response.status(200).send(successResponse)
    })
})

// Edit stock
router.put('/modifyStock', (request, response) => {
    const item = request.body.product
    const isIncrement = request.body.isIncrement
    const quantity = request.body.quantity
    const fractionedQuantity = request.body.fractionedQuantity

    if (quantity) {
        item.cantidadStock =
            isIncrement
                ? item.cantidadStock + quantity
                : item.cantidadStock - quantity
    } else {
        item.cantidadFraccionadaStock =
            isIncrement
                ? item.cantidadFraccionadaStock + fractionedQuantity
                : item.cantidadFraccionadaStock - fractionedQuantity

        if (item.cantidadFraccionadaStock === 0) {
            item.cantidadStock -= 1
            item.cantidadFraccionadaStock = item.unidadMedida.fraccionamiento
        }

        if (item.cantidadFraccionadaStock < 0) {
            item.cantidadStock -= 1
            item.cantidadFraccionadaStock = item.unidadMedida.fraccionamiento + item.cantidadFraccionadaStock
        }

        if (item.cantidadFraccionadaStock > item.unidadMedida.fraccionamiento) {
            item.cantidadStock += 1
            item.cantidadFraccionadaStock = item.cantidadFraccionadaStock - item.unidadMedida.fraccionamiento
        }
    }

    Model.findOneAndUpdate({ _id: item._id }, item, { new: true }, (error) => {
        if (error) {
            return response.status(500).send(errorResponse(error))
        }
        return response.status(200).send(successResponse)
    })
})

module.exports = router