'use strict'
const express = require('express')
const Model = require('../models/venta')
const Renglon = require('../models/ventarenglon')
const router = express.Router()
const {
    generateQuery,
    paginationParams
} = require('../helpers/controllersHelper')
const { default: mongoose } = require('mongoose')

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

// Delete sale
router.delete('/:id', (request, response) => {
    Model.deleteOne({ _id: request.params.id }, (error) => {
        if (error) return response.status(500).json(errorResponse(error))
        return response.status(200).json(successResponse)
    })
})

// Get sales list
router.get('/', (request, response) => {
    const populateParams = [
        'documento',
        'renglones',
        'usuario'
    ]
    const sortParams = { fechaEmision: -1 }
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

// Get sales by filters
router.get('/getAllByFilters', (request, response) => {
    const populateParams = [
        'documento',
        'renglones',
        'usuario'
    ]
    const sortParams = { fechaEmision: -1 }
    const query = generateQuery(request)
    // const renglones = { $match: { productId: mongoose.Types.ObjectId('67a3dbaebf1fc67a7b5e5620') } }
  
    Model
        .find(query)
        .populate(populateParams)
        .sort(sortParams)
        .exec((error, items) => {
            if (error) return response.status(500).json(errorResponse(error))
            return response.json(items)
        })
})

// Get sale by id
router.get('/:id', (request, response) => {
    Model
        .findById(request.params.id)
        .populate(['documento', 'renglones', 'usuario'])
        .exec((error, item) => {
            if (error) return response.status(500).json(errorResponse(error))
            return response.status(200).json(item)
        })
})

// Get newer record
router.get('/recordsInfo/newer', (request, response) => {
    Model
        .find({})
        .sort({ 'fechaEmision': -1 })
        .limit(1)
        .exec((error, item) => {
            if (error) return response.status(500).json(errorResponse(error))
            return response.status(200).json(item)
        })
})

// Get oldest record
router.get('/recordsInfo/oldest', (request, response) => {
    Model
        .find({})
        .sort({ 'fechaEmision': 1 })
        .limit(1)
        .exec((error, item) => {
            if (error) return response.status(500).json(errorResponse(error))
            return response.status(200).json(item)
        })
})

// Get last index of sale
router.get('/last/index/number', (request, response) => {
    Model
        .findOne()
        .sort('-indice')
        .exec((error, item) => {
            if (error) return response.status(500).json(errorResponse(error))
            return response.status(200).json((item) ? item.indice : 0)
        })
})

// Get last voucher code
router.get('/last/voucher/number/:code', (request, response) => {
    Model
        .findOne({ documentoCodigo: request.params.code })
        .sort('-indice')
        .exec((error, item) => {
            if (error) return response.status(500).json(errorResponse(error))
            return response.status(200).json((item) ? item.numeroFactura : 0)
        })
})

//Get sales list id
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

// Get newer sale
router.get('/salesInfo/newer', (request, response) => {
    const fiscalBillCodes = ['001', '006', '011', '051', '081', '082', '083', '111', '118']
    const codesToQuery = fiscalBillCodes.map(code => { return { documentoCodigo: code } })
    const query = { $or: codesToQuery }
    Model
        .find(query)
        .sort({ 'fechaEmision': -1 })
        .limit(1)
        .exec((error, item) => {
            if (error) return response.status(500).json(errorResponse(error))
            return response.status(200).json(item)
        })
})

// Get oldest sale
router.get('/salesInfo/oldest', (request, response) => {
    const fiscalBillCodes = ['001', '006', '011', '051', '081', '082', '083', '111', '118']
    const codesToQuery = fiscalBillCodes.map(code => { return { documentoCodigo: code } })
    const query = { $or: codesToQuery }
    Model
        .find(query)
        .sort({ 'fechaEmision': 1 })
        .limit(1)
        .exec((error, item) => {
            if (error) return response.status(500).json(errorResponse(error))
            return response.status(200).json(item)
        })
})

// Get records quantity of sales
router.get('/recordsInfo/quantity', (request, response) => {
    Model.estimatedDocumentCount((error, numOfDocs) => {
        if (error) return response.status(500).json(errorResponse(error))
        return response.status(200).json(numOfDocs)
    })
})

// Save one single sale
router.post('/', (request, response) => {
    const item = new Model(request.body)
    item.renglones = request.body.renglones.map(renglon => new Renglon(renglon))

    const saveChildEntities = async () => {
        for (const renglon of item.renglones) {
            await renglon.save()
        }
    }

    saveChildEntities()
        .then(() => {
            item.save((error) => {
                if (error) return response.status(500).json(errorResponse(error))
                return response.status(200).json(successResponse)
            })
        })
        .catch(error => {
            return response.status(500).json(errorResponse(error))
        })
})

// Save more than one sale
router.post('/sales/save_all', (request, response) => {
    try {
        const sales = request.body
        for (let index = 0; index < sales.length; index++) {
            const lines = sales[index].renglones
            Renglon.insertMany(lines)
        }
        Model.insertMany(sales)
        return response.status(200).json(successResponse)
    } catch (error) {
        console.log(error)
        return response.status(500).json(errorResponse(error))
    }
})

// Update one single sale
router.put('/:id', (request, response) => {
    let item = new Model(request.body)
    Model.findOneAndUpdate({ _id: request.params.id }, item, { new: true }, (error) => {
        if (error) return response.status(500).json(errorResponse(error))
        return response.status(200).json(successResponse)
    })
})

// Delete specific properties from all sales
router.put('/sales/delete_props_from_all', (request, response) => {
    const propertiesToUnset = {}
    for (let index = 0; index < request.body.length; index++) {
        const prop = request.body[index]
        propertiesToUnset[prop] = 1
    }
    Model.updateMany({}, { $unset: propertiesToUnset }, {}, (error) => {
        if (error) return response.status(500).send(errorResponse(error))
        return response.status(200).send(successResponse)
    })
})

// Update more than one sale
router.put('/sales/edit_all', (request, response) => {
    try {
        const sales = request.body
        for (let index = 0; index < sales.length; index++) {
            const lines = sales[index].renglones
            const bulkOptionsForLines = lines.map(line => ({
                updateOne: {
                    filter: { _id: line._id },
                    update: { $set: line },
                    upsert: true
                }
            }))
            Renglon.bulkWrite(bulkOptionsForLines)
        }
        const bulkOptionsForSales = sales.map(sale => ({
            updateOne: {
                filter: { _id: sale._id },
                update: { $set: sale },
                upsert: true
            }
        }))
        Model.bulkWrite(bulkOptionsForSales)
        return response.status(200).json(successResponse)
    } catch (error) {
        console.log(error)
        return response.status(500).json(errorResponse(error))
    }
})

// Delete specific properties from all lines of sales
router.put('/sales/lines/delete_props_from_all', (request, response) => {
    const propertiesToUnset = {}
    for (let index = 0; index < request.body.length; index++) {
        const prop = request.body[index]
        propertiesToUnset[prop] = 1
    }
    Model.find({}).exec((error, sales) => {
        if (error) return response.status(500).json(errorResponse(error))
        for (let index = 0; index < sales.length; index++) {
            const lines = sales[index].renglones

            const bulkOptionsForLines = lines.map(line => ({
                updateOne: {
                    filter: { _id: line._id },
                    update: { $unset: propertiesToUnset },
                    upsert: true
                }
            }))
            Renglon.bulkWrite(bulkOptionsForLines)
        }
    })
    return response.status(200).json(successResponse)
})

module.exports = router