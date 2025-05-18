'use strict'
const express = require('express')
const router = express.Router()
const helpers = require('../helpers')

const { processRequest, services } = helpers.controllersHelper


const modelName = 'sales'
const populateParams = [ 'documento', 'renglones', 'usuario' ]

router.delete('/records/remove', async (request, response) => {
    const data = {
        ids: request.body,
        tenantId: request.headers.tenantid
    }
    const props = { data, modelName, service: services.remove }
    const processResult = await processRequest(props)
    response.json(processResult)
})

router.get('/records/countRecords', async (request, response) => {
    const data = {
        tenantId: request.headers.tenantid
    }
    const props = { data, modelName, service: services.countRecords }
    const processResult = await processRequest(props)
    response.json(processResult)
})

router.get('/records/findAll', async (request, response) => {
    const data = {
        populateParams,
        tenantId: request.headers.tenantid
    }
    const props = { data, modelName, service: services.findAll }
    const processResult = await processRequest(props)
    response.json(processResult)
})

router.get('/records/findAllByFilters', async (request, response) => {
    const data = {
        populateParams,
        request,
        tenantId: request.headers.tenantid
    }
    const props = { data, modelName, service: services.findAllByFilters }
    const processResult = await processRequest(props)
    response.json(processResult)
})

router.get('/records/findById', async (request, response) => {
    const data = {
        id: request.query.id,
        populateParams,
        tenantId: request.headers.tenantid
    }
    const props = { data, modelName, service: services.findById }
    const processResult = await processRequest(props)
    response.json(processResult)
})

router.get('/records/findLastIndex', async (request, response) => {
    const data = {
        tenantId: request.headers.tenantid
    }
    const props = { data, modelName, service: services.findById }
    const processResult = await processRequest(props)
    response.json(processResult)
})

router.get('/records/findLastVoucherNumber', async (request, response) => {
    const data = {
        code: request.query.code,
        tenantId: request.headers.tenantid
    }
    const props = { data, modelName, service: services.findById }
    const processResult = await processRequest(props)
    response.json(processResult)
})

router.get('/records/findNewer', async (request, response) => {
    const data = {
        populateParams,
        sortParams: { fechaEmision: -1 },
        tenantId: request.headers.tenantid
    }
    const props = { data, modelName, service: services.findNewer }
    const processResult = await processRequest(props)
    response.json(processResult)
})

router.get('/records/findNewerSale', async (request, response) => {
    const data = {
        sortParams: { fechaEmision: -1 },
        populateParams,
        tenantId: request.headers.tenantid
    }
    const props = { data, modelName, service: services.findNewer }
    const processResult = await processRequest(props)
    response.json(processResult)
})

router.get('/records/findOldest', async (request, response) => {
    const data = {
        populateParams,
        sortParams: { fechaEmision: 1 },
        tenantId: request.headers.tenantid
    }
    const props = { data, modelName, service: services.findOldest }
    const processResult = await processRequest(props)
    response.json(processResult)
})

router.get('/records/findOldestSale', async (request, response) => {
    const data = {
        sortParams: { fechaEmision: 1 },
        populateParams,
        tenantId: request.headers.tenantid
    }
    const props = { data, modelName, service: services.findNewer }
    const processResult = await processRequest(props)
    response.json(processResult)
})

router.get('/records/findPaginated', async (request, response) => {
    const data = {
        populateParams,
        request,
        tenantId: request.headers.tenantid
    }
    const props = { data, modelName, service: services.findPaginated }
    const processResult = await processRequest(props)
    response.json(processResult)
})

router.post('/records/save', async (request, response) => {
    const data = {
        records: request.body,
        tenantId: request.headers.tenantid
    }
    const props = { data, modelName, service: services.save }
    const processResult = await processRequest(props)
    response.json(processResult)
})

router.put('/records/edit', async (request, response) => {
    const data = {
        records: request.body,
        tenantId: request.headers.tenantid
    }
    const props = { data, modelName, service: services.remove }
    const processResult = await processRequest(props)
    response.json(processResult)
})

router.put('/records/removeProps', async (request, response) => {
    const data = {
        props: request.body,
        tenantId: request.headers.tenantid
    }
    const props = { data, modelName, service: services.removeProps }
    const processResult = await processRequest(props)
    response.json(processResult)
})

module.exports = router