const express = require('express')
const Model   = require('../models/salida')
const router  = express.Router()

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

router.post('/', (request, response) => {
    let item = new Model(request.body)
    item.save((error, item) => {
        if (error) return response.status(500).send(errorResponse(error))
        return response.status(200).send(successWithItems(item))
    })
})

router.get('/', (request, response) => {
    const { page, limit, filters, initialDate, finalDate } = request.query
    const query = (filters) ? JSON.parse(filters) : null
    if (query && Object.keys(query).length > 0) {
        if (query.descripcion) query.descripcion = new RegExp(query.descripcion, 'i')
    }

    if (!page) {
        Model
            .find((initialDate) ? { fecha: { $gte: initialDate, $lte: finalDate } } : {})
            .populate(['usuario'])
            .exec((error, items) => {
            if (error) return response.status(500).json(errorResponse(error))
            return response.status(200).json(items)
        })
    } else {
        Model.paginate(query, {
            page,
            limit,
            populate: ['usuario'],
            sort: { '_id': -1 }
        }, (error, items) => {
            if (error) return response.status(500).send(errorResponse(error))
            return response.status(200).send(successWithItems(items))
        })
    }
})

router.get('/:id', (request, response) => {
    Model.findById(request.params.id).exec((error, item) => {
        if (error) return response.status(500).send(errorResponse(error))
        return response.status(200).send(successWithItems(item))
    })
})

//Get salidas list id
router.get('/multiple/idList', (request, response) => {
    const {ids} = request.query
    const query = {_id: {$in: JSON.parse(ids)}}
    Model.find(query, (error, items) => {
        if (error) return response.status(500).json(errorResponse(error))
        return response.status(200).json(items)
    })
})

router.put('/', (request, response) => {
    let item = new Model(request.body)
    Model.findOneAndUpdate({ _id: item._id }, item, { new: true }, (error, item) => {
        if (error) return response.status(500).send(errorResponse(error))
        return response.status(200).send(successWithItems(item))
    })
})

router.delete('/:id', (request, response) => {
    Model.remove({_id: request.params.id}, (error) => {
        if(error){
            return response.status(500).send(errorResponse(error))
        }
        return response.status(200).send(successResponse)
    })
})

module.exports = router