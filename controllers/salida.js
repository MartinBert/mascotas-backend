'use strict'
const express = require('express')
const Model = require('../models/salida')
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

// Delete output
router.delete('/:id', (request, response) => {
    Model.deleteOne({ _id: request.params.id }, (error) => {
        if (error) {
            return response.status(500).send(errorResponse(error))
        }
        return response.status(200).send(successResponse)
    })
})

// Get outputs list
router.get('/', (request, response) => {
    const populateParams = ['usuario']
    const sortParams = {fecha: -1}
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

// Get output by id
router.get('/:id', (request, response) => {
    Model.findById(request.params.id).exec((error, item) => {
        if (error) return response.status(500).send(errorResponse(error))
        return response.status(200).send(successWithItems(item))
    })
})

//Get outputs list id
router.get('/multiple/idList', (request, response) => {
    const { ids } = request.query
    const query = { _id: { $in: JSON.parse(ids) } }
    Model.find(query, (error, items) => {
        if (error) return response.status(500).json(errorResponse(error))
        return response.status(200).json(items)
    })
})

// Get newer output
router.get('/recordsInfo/newer', (request, response) => {
    Model
        .find({})
        .sort({ 'fecha': -1 })
        .limit(1)
        .exec((error, item) => {
            if (error) return response.status(500).json(errorResponse(error))
            return response.status(200).json(item)
        })
})

// Get oldest output
router.get('/recordsInfo/oldest', (request, response) => {
    Model
        .find({})
        .sort({ 'fecha': 1 })
        .limit(1)
        .exec((error, item) => {
            if (error) return response.status(500).json(errorResponse(error))
            return response.status(200).json(item)
        })
})

// Get records quantity of outputs
router.get('/recordsInfo/quantity', (request, response) => {
    Model.estimatedDocumentCount((error, numOfDocs) => {
        if (error) return response.status(500).json(errorResponse(error))
        return response.status(200).json(numOfDocs)
    })
})

// Save new output
router.post('/', (request, response) => {
    let item = new Model(request.body)
    item.save((error, item) => {
        if (error) return response.status(500).send(errorResponse(error))
        return response.status(200).send(successWithItems(item))
    })
})

// Edit one single output
router.put('/', (request, response) => {
    let item = new Model(request.body)
    Model.findOneAndUpdate({ _id: item._id }, item, { new: true }, (error, item) => {
        if (error) return response.status(500).send(errorResponse(error))
        return response.status(200).send(successWithItems(item))
    })
})

// Update more than one output
router.put('/outputs/edit_all', (request, response) => {
    try {
        Model.updateMany({}, { $unset: { ganancia: 1 } } )
        // const outputs = request.body
        // const bulkOptions = outputs.map(output => ({
        //     updateOne: {
        //         filter: { _id: output._id },
        //         update: {
        //             $unset: {
        //                 ganancia: 1
        //             },
        //             $set: output
        //         },
        //         upsert: true
        //     }
        // }))
        // Model.bulkWrite(bulkOptions)
        return response.status(200).json(successResponse)
    } catch (error) {
        console.log(error)
        return response.status(500).json(errorResponse(error))
    }
})

module.exports = router