'use strict'
const modelsData = require('../models')

const services = {
    countRecords: 'countRecords',
    edit: 'edit',
    findAll: 'findAll',
    findAllByFilters: 'findAllByFilters',
    findById: 'findById',
    findNewer: 'findNewer',
    findOldest: 'findOldest',
    findPaginated: 'findPaginated',
    remove: 'remove',
    removeProps: 'removeProps',
    save: 'save'
}

const getModel = (modelName) => {
    const modelItem = modelsData.find(modelItem => modelItem.name === modelName)
    const model = modelItem.model
    return model
}

const reply = (error, replyData = null) => {
    const response = {
        code: error ? 500 : 200,
        data: error ?? replyData,
        message: error ? 'Error' : 'OK'
    }
    return response
}

const verifyFilters = (queryData) => {
    if (!queryData) return false
    if (Object.keys(queryData).length === 0) return false
    const validValues = Object.values(queryData)
        .filter(value => value !== null && value !== '')
    if (validValues.length === 0) return false
    return true
}

const generateQuery = (request) => {
    const filters = request.query.filters ?? null
    const queryData = JSON.parse(filters)
    const query = {}
    const existsFilters = verifyFilters(queryData)
    if (!existsFilters) return query
    const queryKeys = Object.keys(queryData)
    const queryValues = Object.values(queryData)
    queryKeys.forEach(function (objKey, index) {
        const value = queryValues[index]
        const valueIsString = typeof value === 'string'
        if (value && valueIsString) query[objKey] = new RegExp(value, 'i')
        else if (value && !valueIsString) query[objKey] = value
    })
    return query
}

const paginationParams = (
    request,
    populateParams = null,
    sortParams = null
) => {
    return {
        limit: request.query.limit || 1000000,
        page: request.query.page || 1,
        populate: populateParams,
        sort: sortParams ?? null
    }
}

const processRequest = async (props) => {
    const { service, ...caseProps } = props
    let response
    switch (service) {
        case services.countRecords:
            response = await processCountRecords(caseProps)
            break
        case services.edit:
            response = await processEdit(caseProps)
            break
        case services.findAll:
            response = await processFindAll(caseProps)
            break
        case services.findAllByFilters:
            response = await processFindAllByFilters(caseProps)
            break
        case services.findById:
            response = await processFindById(caseProps)
            break
        case services.findNewer:
            response = await processFindNewer(caseProps)
            break
        case services.findOldest:
            response = await processFindOldest(caseProps)
            break
        case services.findPaginated:
            response = await processFindPaginated(caseProps)
            break
        case services.remove:
            response = await processRemove(caseProps)
            break
        case services.removeProps:
            response = await processRemoveProps(caseProps)
            break
        case services.save:
            response = await processSave(caseProps)
            break
        default:
            response = null
            break
    }
    return response
}

const processCountRecords = async (caseProps) => {
    let response

    try {
        const { modelName } = caseProps
        const Model = getModel(modelName)
        response = await Model
            .estimatedDocumentCount()
            .then(
                (replyData) => reply(null, replyData),
                (error) => reply(error)
            )

    } catch (error) {
        console.error(error)
        response = reply(error)

    } finally {
        return response
    }
}

const processEdit = async (caseProps) => {
    let response

    try {
        const { data: { records }, modelName } = caseProps
        const Model = getModel(modelName)
        const recordsToEdit = Array.isArray(records) ? records : [records]
        const bulkOptions = recordsToEdit.map(record => ({
            updateOne: {
                filter: { _id: record._id },
                update: { $set: record },
                upsert: true
            }
        }))
        response = await Model
            .bulkWrite(bulkOptions)
            .then(
                (replyData) => reply(null, replyData),
                (error) => reply(error)
            )

    } catch (error) {
        console.log(error)
        response = reply(error)

    } finally {
        return response
    }
}

const processFindAll = async (caseProps) => {
    let response

    try {
        const { data: { sortParams }, modelName } = caseProps
        const Model = getModel(modelName)
        response = await Model
            .find({})
            .sort(sortParams)
            .then(
                (replyData) => reply(null, replyData),
                (error) => reply(error)
            )

    } catch (error) {
        console.error(error)
        response = reply(error)

    } finally {
        return response
    }
}

const processFindAllByFilters = async (caseProps) => {
    let response

    try {
        const { data: { request, sortParams }, modelName } = caseProps
        const Model = getModel(modelName)
        response = await Model
            .paginate(
                generateQuery(request),
                paginationParams(request, null, sortParams),
                reply
            )

    } catch (error) {
        console.error(error)
        response = reply(error)

    } finally {
        return response
    }
}

const processFindById = async (caseProps) => {
    try {
        const { data: { id }, modelName } = caseProps
        const Model = getModel(modelName)
        response = await Model
            .findById(id)
            .then(
                (replyData) => reply(null, replyData),
                (error) => reply(error)
            )

    } catch (error) {
        console.error(error)
        response = reply(error)

    } finally {
        return response
    }
}

const processFindNewer = async (caseProps) => {
    let response

    try {
        const { modelName } = caseProps
        const Model = getModel(modelName)
        response = await Model
            .find({})
            .sort({ createdAt: -1 })
            .limit(1)
            .then(
                (replyData) => reply(null, replyData),
                (error) => reply(error)
            )

    } catch (error) {
        console.error(error)
        response = reply(error)

    } finally {
        return response
    }
}

const processFindOldest = async (caseProps) => {
    let response

    try {
        const { modelName } = caseProps
        const Model = getModel(modelName)
        response = await Model
            .find({})
            .sort({ createdAt: 1 })
            .limit(1)
            .then(
                (replyData) => reply(null, replyData),
                (error) => reply(error)
            )

    } catch (error) {
        console.error(error)
        response = reply(error)

    } finally {
        return response
    }
}

const processFindPaginated = async (caseProps) => {
    let response

    try {
        const { data: { request, sortParams }, modelName } = caseProps
        const Model = getModel(modelName)
        response = await Model
            .paginate(
                generateQuery(request),
                paginationParams(request, null, sortParams),
                reply
            )

    } catch (error) {
        console.error(error)
        response = reply(error)

    } finally {
        return response
    }
}

const processRemove = async (caseProps) => {
    let response

    try {
        const { data: { ids }, modelName } = caseProps
        const Model = getModel(modelName)
        const idsToRemove = Array.isArray(ids) ? ids : [ids]
        response = await Model
            .deleteMany({ _id: { $in: idsToRemove } })
            .then(
                (replyData) => reply(null, replyData),
                (error) => reply(error)
            )

    } catch (error) {
        console.error(error)
        response = reply(error)

    } finally {
        return response
    }
}

const processRemoveProps = async (caseProps) => {
    let response

    try {
        const { data: { props }, modelName } = caseProps
        const Model = getModel(modelName)
        const propsToDelete = Array.isArray(props) ? props : [props]
        const propertiesToUnset = {}
        for (let index = 0; index < propsToDelete.length; index++) {
            const prop = propsToDelete[index]
            propertiesToUnset[prop] = 1
        }
        response = await Model
            .updateMany({}, { $unset: propertiesToUnset }, {})
            .then(
                (replyData) => reply(null, replyData),
                (error) => reply(error)
            )

    } catch (error) {
        console.error(error)
        response = reply(error)

    } finally {
        return response
    }
}

const processSave = async (caseProps) => {
    let response

    try {
        const { data: { records } , modelName } = caseProps
        const Model = getModel(modelName)
        const recordsToSave = Array.isArray(records) ? records : [records]
        response = await Model
            .insertMany(recordsToSave)
            .then(
                (replyData) => reply(null, replyData),
                (error) => reply(error)
            )

    } catch (error) {
        console.error(error)
        response = reply(error)

    } finally {
        return response
    }
}

const controllersHelper = {
    generateQuery,
    paginationParams,
    processRequest,
    services
}

module.exports = controllersHelper