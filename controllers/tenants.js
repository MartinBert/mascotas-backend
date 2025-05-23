'use strict'
const express = require('express')
const router = express.Router()
const helpers = require('../helpers')
const models = require('../models')

const { processRequest, services } = helpers.controllersHelper


const modelName = 'tenant'
const populateParams = []
const refModelsNames = []

router.delete('/records/remove', async (request, response) => {
    const props = {
        ids: request.query.ids,
        modelName,
        service: services.remove
    }
    const processResult = await processRequest(props)
    response.json(processResult)
})

router.get('/records/countRecords', async (request, response) => {
    const props = {
        modelName,
        service: services.countRecords
    }
    const processResult = await processRequest(props)
    response.json(processResult)
})

router.get('/records/findAll', async (request, response) => {
    const props = {
        modelName,
        populateParams,
        refModelsNames,
        service: services.findAll
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
        service: services.findAllByFilters
    }
    const processResult = await processRequest(props)
    response.json(processResult)
})

router.get('/records/findAllUsers', async (request, response) => {
    const props = {
        populateParams: ['empresa', 'puntoVenta'],
        refModelsNames: ['empresa', 'puntoventa'],
        service: services.findAllUsers
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
        service: services.findById
    }
    const processResult = await processRequest(props)
    response.json(processResult)
})

router.get('/records/findNewer', async (request, response) => {
    const props = {
        modelName,
        populateParams,
        refModelsNames,
        service: services.findNewer
    }
    const processResult = await processRequest(props)
    response.json(processResult)
})

router.get('/records/findOldest', async (request, response) => {
    const props = {
        modelName,
        populateParams,
        refModelsNames,
        service: services.findOldest
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
        service: services.findPaginated
    }
    const processResult = await processRequest(props)
    response.json(processResult)
})

router.post('/records/save', async (request, response) => {
    const props = {
        modelName,
        records: request.body,
        service: services.save
    }
    const processResult = await processRequest(props)
    response.json(processResult)
})

router.put('/records/edit', async (request, response) => {
    const props = {
        modelName,
        records: request.body,
        service: services.edit
    }
    const processResult = await processRequest(props)
    response.json(processResult)
})

router.put('/records/removeProps', async (request, response) => {
    const props = {
        modelName,
        props: request.body,
        service: services.removeProps
    }
    const processResult = await processRequest(props)
    response.json(processResult)
})

module.exports = router