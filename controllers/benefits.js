'use strict'
const express = require('express')
const router = express.Router()
const helpers = require('../helpers')

const { processRequest, services } = helpers.controllersHelper
const modelName = 'benefits'


router.delete('/records/remove', async (request, response) => {
    const data = { ids: request.body }
    const props = { data, modelName, service: services.remove }
    const processResult = await processRequest(props)
    response.json(processResult)
})

router.get('/records/findAll', async (request, response) => {
    const data = { sortParams: { createdAt: -1 } }
    const props = { data, modelName, service: services.findAll }
    const processResult = await processRequest(props)
    response.json(processResult)
})

router.get('/records/findAllByFilters', async (request, response) => {
    const data = { request, sortParams: { createdAt: -1 } }
    const props = { data, modelName, service: services.findAllByFilters }
    const processResult = await processRequest(props)
    response.json(processResult)
})

router.get('/records/findById/:id', async (request, response) => {
    const data = { id: request.params.id }
    const props = { data, modelName, service: services.findById }
    const processResult = await processRequest(props)
    response.json(processResult)
})

router.get('/records/findNewer', async (request, response) => {
    const props = { modelName, service: services.findNewer }
    const processResult = await processRequest(props)
    response.json(processResult)
})

router.get('/records/findOldest', async (request, response) => {
    const props = { modelName, service: services.findOldest }
    const processResult = await processRequest(props)
    response.json(processResult)
})

router.get('/records/findPaginated', async (request, response) => {
    const data = { request, sortParams: { createdAt: -1 } }
    const props = { data, modelName, service: services.findPaginated }
    const processResult = await processRequest(props)
    response.json(processResult)
})

router.get('/records/getTotalQuantity', async (request, response) => {
    const props = { modelName, service: services.countRecords }
    const processResult = await processRequest(props)
    response.json(processResult)
})

router.post('/records/save', async (request, response) => {
    const data = { records: request.body }
    const props = { data, modelName, service: services.save }
    const processResult = await processRequest(props)
    response.json(processResult)
})

router.put('/records/edit', async (request, response) => {
    const data = { records: request.body }
    const props = { data, modelName, service: services.remove }
    const processResult = await processRequest(props)
    response.json(processResult)
})

router.put('/records/removeProps', async (request, response) => {
    const data = { props: request.body }
    const props = { data, modelName, service: services.removeProps }
    const processResult = await processRequest(props)
    response.json(processResult)
})

module.exports = router