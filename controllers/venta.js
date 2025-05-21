'use strict'
const express = require('express')
const router = express.Router()
const helpers = require('../helpers')

const { processRequest, services } = helpers.controllersHelper


const childModelName = 'ventarenglon'
const childProp = 'renglones'
const defaultSortParams = { fechaEmision: -1 }
const modelName = 'venta'
const populateParams = ['cliente', 'documento', 'empresa', 'mediosPago', 'puntoVenta', 'renglones', 'usuario' ]
const refModelsNames = ['cliente', 'documento', 'empresa', 'mediopago', 'puntoventa', 'ventarenglon', 'usuario' ]

router.delete('/records/remove', async (request, response) => {
    const props = {
        childModelName,
        childProp,
        ids: request.body,
        modelName,
        service: services.remove,
        tenantId: request.headers.tenantid
    }
    const processResult = await processRequest(props)
    response.json(processResult)
})

router.get('/records/countRecords', async (request, response) => {
    const props = {
        modelName,
        service: services.countRecords,
        tenantId: request.headers.tenantid
    }
    const processResult = await processRequest(props)
    response.json(processResult)
})

router.get('/records/findAll', async (request, response) => {
    const props = {
        modelName,
        populateParams,
        refModelsNames,
        service: services.findAll,
        sortParams: defaultSortParams,
        tenantId: request.headers.tenantid
    }
    const processResult = await processRequest(props)
    response.json(processResult)
})

router.get('/records/findAllByFilters', async (request, response) => {
    const props = {
        modelName,
        populateParams,
        refModelsNames,
        request,
        service: services.findAllByFilters,
        sortParams: defaultSortParams,
        tenantId: request.headers.tenantid
    }
    const processResult = await processRequest(props)
    response.json(processResult)
})

router.get('/records/findById', async (request, response) => {
    const props = {
        id: request.query.id,
        modelName,
        populateParams,
        refModelsNames,
        service: services.findById,
        tenantId: request.headers.tenantid
    }
    const processResult = await processRequest(props)
    response.json(processResult)
})

router.get('/records/findLastIndex', async (request, response) => {
    const data = {
        tenantId: request.headers.tenantid
    }
    const props = { data, modelName, service: services.findLastIndex }
    const processResult = await processRequest(props)
    response.json(processResult)
})

router.get('/records/findLastVoucherNumber', async (request, response) => {
    const data = {
        code: request.query.code,
        tenantId: request.headers.tenantid
    }
    const props = { data, modelName, service: services.findLastVoucherNumber }
    const processResult = await processRequest(props)
    response.json(processResult)
})

router.get('/records/findNewer', async (request, response) => {
    const props = {
        modelName,
        populateParams,
        refModelsNames,
        service: services.findNewer,
        sortParams: defaultSortParams,
        tenantId: request.headers.tenantid
    }
    const processResult = await processRequest(props)
    response.json(processResult)
})

router.get('/records/findNewerSale', async (request, response) => {
    const data = {
        populateParams,
        refModelsNames,
        sortParams: defaultSortParams,
        tenantId: request.headers.tenantid
    }
    const props = { data, modelName, service: services.findNewerSale }
    const processResult = await processRequest(props)
    response.json(processResult)
})

router.get('/records/findOldest', async (request, response) => {
    const props = {
        modelName,
        populateParams,
        refModelsNames,
        service: services.findOldest,
        sortParams: { fechaEmision: 1 },
        tenantId: request.headers.tenantid
    }
    const processResult = await processRequest(props)
    response.json(processResult)
})

router.get('/records/findOldestSale', async (request, response) => {
    const data = {
        populateParams,
        refModelsNames,
        sortParams: { fechaEmision: 1 },
        tenantId: request.headers.tenantid
    }
    const props = { data, modelName, service: services.findOldestSale }
    const processResult = await processRequest(props)
    response.json(processResult)
})

router.get('/records/findPaginated', async (request, response) => {
    const props = {
        modelName,
        populateParams,
        refModelsNames,
        request,
        service: services.findPaginated,
        sortParams: defaultSortParams,
        tenantId: request.headers.tenantid
    }
    const processResult = await processRequest(props)
    response.json(processResult)
})

router.post('/records/save', async (request, response) => {
    const props = {
        childModelName,
        childProp,
        modelName,
        records: request.body,
        service: services.save,
        tenantId: request.headers.tenantid
    }
    const processResult = await processRequest(props)
    response.json(processResult)
})

router.put('/records/edit', async (request, response) => {
    const props = {
        childModelName,
        childProp,
        modelName,
        records: request.body,
        service: services.edit,
        tenantId: request.headers.tenantid
    }
    const processResult = await processRequest(props)
    response.json(processResult)
})

router.put('/records/removeProps', async (request, response) => {
    const props = {
        modelName,
        props: request.body,
        service: services.removeProps,
        tenantId: request.headers.tenantid
    }
    const processResult = await processRequest(props)
    response.json(processResult)
})

module.exports = router