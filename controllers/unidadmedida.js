'use strict'
const express = require('express')
const router = express.Router()
const helpers = require('../helpers')

const { processRequest, services } = helpers.controllersHelper


const modelName = 'unidadmedida'
const populateParams = []

router.delete('/records/remove', async (request, response) => {
    const props = {
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

router.get('/records/findNewer', async (request, response) => {
    const props = {
        modelName,
        populateParams,
        refModelsNames,
        service: services.findNewer,
        tenantId: request.headers.tenantid
    }
    const processResult = await processRequest(props)
    response.json(processResult)
})

router.get('/records/findOldest', async (request, response) => {
    const props = {
        modelName,
        populateParams,
        refModelsNames,
        service: services.findOldest,
        tenantId: request.headers.tenantid
    }
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
        tenantId: request.headers.tenantid
    }
    const processResult = await processRequest(props)
    response.json(processResult)
})

router.post('/records/save', async (request, response) => {
    const props = {
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