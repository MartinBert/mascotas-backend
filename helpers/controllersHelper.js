'use strict'
const modelsData = require('../models')
const { getModelByTenant } = require('../config')


const defaultTenantsModelName = 'tenant'
const defaultUsersModelName = 'usuario'
const services = {
    countRecords: 'countRecords',
    edit: 'edit',
    findAll: 'findAll',
    findAllByFilters: 'findAllByFilters',
    findAllForCatalogue: 'findAllForCatalogue',
    findAllUsers: 'findAllUsers',
    findById: 'findById',
    findLastIndex: 'findLastIndex',
    findLastVoucherNumber: 'findLastVoucherNumber',
    findNewer: 'findNewer',
    findNewerSale: 'findNewerSale',
    findOldest: 'findOldest',
    findOldestSale: 'findOldestSale',
    findPaginated: 'findPaginated',
    modifyStock: 'modifyStock',
    remove: 'remove',
    removeProps: 'removeProps',
    save: 'save'
}

const getRefModels = (refModelsNames) => {
    const refModels = []
    if (refModelsNames && refModelsNames.length > 0) {
        for (let index = 0; index < refModelsNames.length; index++) {
            const refModelName = refModelsNames[index]
            const refModelSchema = modelsData.find(model => model.name === refModelName).schema
            const refModel = { refModelName, refModelSchema }
            refModels.push(refModel)
        }
    }
    return refModels
}

const getSchema = (modelName) => {
    const modelItem = modelsData.find(modelItem => modelItem.name === modelName)
    const schema = modelItem.schema
    return schema
}

const getTenantsSchema = () => {
    const modelItem = modelsData.find(modelItem => modelItem.name === defaultTenantsModelName)
    const schema = modelItem.schema
    return schema
}

const getUsersSchema = () => {
    const modelItem = modelsData.find(modelItem => modelItem.name === defaultUsersModelName)
    const schema = modelItem.schema
    return schema
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
    for (let index = 0; index < queryKeys.length; index++) {
        const key = queryKeys[index]
        const value = queryValues[index]
        const valueIsString = typeof value === 'string'
        if (value) {
            if (valueIsString) query[key] = new RegExp(value, 'i')
            else query[key] = value
        }
    }
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
        populate: populateParams ?? null,
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
        case services.findAllForCatalogue:
            response = await processFindAllForCatalogue(caseProps)
            break
        case services.findAllUsers:
            response = await processFindAllUsers(caseProps)
            break
        case services.findById:
            response = await processFindById(caseProps)
            break
        case services.findLastIndex:
            response = await processFindLastIndex(caseProps)
            break
        case services.findLastVoucherNumber:
            response = await processFindLastVoucherNumber(caseProps)
            break
        case services.findNewer:
            response = await processFindNewer(caseProps)
            break
        case services.findNewerSale:
            response = await processFindNewerSale(caseProps)
            break
        case services.findOldest:
            response = await processFindOldest(caseProps)
            break
        case services.findOldestSale:
            response = await processFindOldestSale(caseProps)
            break
        case services.findPaginated:
            response = await processFindPaginated(caseProps)
            break
        case services.modifyStock:
            response = await processModifyStock(caseProps)
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
        const { data: { tenantId }, modelName } = caseProps
        const modelSchema = getSchema(modelName)
        const Model = getModelByTenant(tenantId, modelName, modelSchema)
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
        const { data: { records, tenantId }, modelName } = caseProps
        const recordsToEdit = Array.isArray(records) ? records : [records]
        const bulkOptions = recordsToEdit.map(record => ({
            updateOne: {
                filter: { _id: record._id },
                update: { $set: record },
                upsert: true
            }
        }))
        const modelSchema = getSchema(modelName)
        const Model = getModelByTenant(tenantId, modelName, modelSchema)
        response = await Model
            .bulkWrite(bulkOptions)
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

const processFindAll = async (caseProps) => {
    let response

    try {
        const { data: { populateParams, refModelsNames, sortParams, tenantId }, modelName } = caseProps
        const modelSchema = getSchema(modelName)
        const refModels = getRefModels(refModelsNames)
        const Model = getModelByTenant(tenantId, modelName, modelSchema, refModels)
        response = await Model
            .find({})
            .sort(sortParams ?? { createdAt: -1 })
            .populate(populateParams)
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
        const { data: { populateParams, refModelsNames, request, sortParams, tenantId }, modelName } = caseProps
        const modelSchema = getSchema(modelName)
        const refModels = getRefModels(refModelsNames)
        const Model = getModelByTenant(tenantId, modelName, modelSchema, refModels)
        const sortBy = sortParams ?? { createdAt: -1 }
        response = await Model
            .paginate(
                generateQuery(request),
                paginationParams(request, populateParams, sortBy),
                reply
            )

    } catch (error) {
        console.error(error)
        response = reply(error)

    } finally {
        return response
    }
}

const processFindAllForCatalogue = async (caseProps) => {
    let response

    try {
        const { data: { populateParams, filters, refModelsNames, sortParams, tenantId }, modelName } = caseProps
        const modelSchema = getSchema(modelName)
        const refModels = getRefModels(refModelsNames)
        const Model = getModelByTenant(tenantId, modelName, modelSchema, refModels)
        const sortBy = sortParams ?? { createdAt: -1 }
        response = await Model
            .find(filters)
            .sort(sortBy)
            .populate(populateParams)
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

const processFindAllUsers = async (caseProps) => {
    let response

    try {
        const { data: { refModelsNames } } = caseProps
        const tenantsSchema = getTenantsSchema()
        const TenantModel = getModelByTenant(null, defaultTenantsModelName, tenantsSchema)
        const tenants = await TenantModel.find({})
        const users = []
        for (let index = 0; index < tenants.length; index++) {
            const tenantId = tenants[index].cuit
            const usersSchema = getUsersSchema()
            const refModels = getRefModels(refModelsNames)
            const UserModel = getModelByTenant(tenantId, defaultUsersModelName, usersSchema, refModels)
            const tenantUsers = await UserModel.find({})
            users.push(tenantUsers)
        }
        response = reply(null, users)

    } catch (error) {
        console.error(error)
        response = reply(error)

    } finally {
        return response
    }
}

const processFindById = async (caseProps) => {
    let response
    
    try {
        const { data: { id, populateParams, refModelsNames, tenantId }, modelName } = caseProps
        const modelSchema = getSchema(modelName)
        const refModels = getRefModels(refModelsNames)
        const Model = getModelByTenant(tenantId, modelName, modelSchema, refModels)
        response = await Model
            .findById(id)
            .populate(populateParams)
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

const processFindLastIndex = async (caseProps) => {
    let response
    
    try {
        const { data: { tenantId }, modelName } = caseProps
        const modelSchema = getSchema(modelName)
        const Model = getModelByTenant(tenantId, modelName, modelSchema)
        response = await Model
            .findOne()
            .sort('-indice')
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

const processFindLastVoucherNumber = async (caseProps) => {
    let response
    
    try {
        const { data: { code, tenantId }, modelName } = caseProps
        const modelSchema = getSchema(modelName)
        const Model = getModelByTenant(tenantId, modelName, modelSchema)
        response = await Model
            .findOne({ documentoCodigo: code })
            .sort('-indice')
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
        const { data: { populateParams, refModelsNames, sortParams, tenantId }, modelName } = caseProps
        const modelSchema = getSchema(modelName)
        const refModels = getRefModels(refModelsNames)
        const Model = getModelByTenant(tenantId, modelName, modelSchema, refModels)
        response = await Model
            .find({})
            .sort(sortParams ?? { createdAt: -1 })
            .limit(1)
            .populate(populateParams)
            .then(
                ([replyData]) => reply(null, replyData),
                (error) => reply(error)
            )

    } catch (error) {
        console.error(error)
        response = reply(error)

    } finally {
        return response
    }
}

const processFindNewerSale = async (caseProps) => {
    let response

    try {
        const { data: { populateParams, sortParams, tenantId }, modelName } = caseProps
        const modelSchema = getSchema(modelName)
        const refModels = getRefModels([ 'documento', 'renglones', 'usuario' ])
        const Model = getModelByTenant(tenantId, modelName, modelSchema, refModels)
        const fiscalBillCodes = ['001', '006', '011', '051', '081', '082', '083', '111', '118']
        const codesToQuery = fiscalBillCodes.map(code => { return { documentoCodigo: code } })
        const query = { $or: codesToQuery }
        response = await Model
            .find(query)
            .sort(sortParams ?? { createdAt: -1 })
            .limit(1)
            .populate(populateParams)
            .then(
                ([replyData]) => reply(null, replyData),
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
        const { data: { populateParams, refModelsNames, sortParams, tenantId }, modelName } = caseProps
        const modelSchema = getSchema(modelName)
        const refModels = getRefModels(refModelsNames)
        const Model = getModelByTenant(tenantId, modelName, modelSchema, refModels)
        response = await Model
            .find({})
            .sort(sortParams ?? { createdAt: 1 })
            .limit(1)
            .populate(populateParams)
            .then(
                ([replyData]) => reply(null, replyData),
                (error) => reply(error)
            )

    } catch (error) {
        console.error(error)
        response = reply(error)

    } finally {
        return response
    }
}

const processFindOldestSale = async (caseProps) => {
    let response

    try {
        const { data: { populateParams, sortParams, tenantId }, modelName } = caseProps
        const modelSchema = getSchema(modelName)
        const refModels = getRefModels([ 'documento', 'renglones', 'usuario' ])
        const Model = getModelByTenant(tenantId, modelName, modelSchema, refModels)
        const fiscalBillCodes = ['001', '006', '011', '051', '081', '082', '083', '111', '118']
        const codesToQuery = fiscalBillCodes.map(code => { return { documentoCodigo: code } })
        const query = { $or: codesToQuery }
        response = await Model
            .find(query)
            .sort(sortParams ?? { createdAt: 1 })
            .limit(1)
            .populate(populateParams)
            .then(
                ([replyData]) => reply(null, replyData),
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
        const { data: { populateParams, refModelsNames, request, sortParams, tenantId }, modelName } = caseProps
        const modelSchema = getSchema(modelName)
        const refModels = getRefModels(refModelsNames)
        const Model = getModelByTenant(tenantId, modelName, modelSchema, refModels)
        const sortBy = sortParams ?? { ceratedAt: -1 }
        response = await Model
            .paginate(
                generateQuery(request),
                paginationParams(request, populateParams, sortBy),
                reply
            )

    } catch (error) {
        console.error(error)
        response = reply(error)

    } finally {
        return response
    }
}

const processModifyStock = async (caseProps) => {
    let response

    try {
        const { data: { modificationData, tenantId }, modelName } = caseProps
        const item = modificationData.product
        const isIncrement = modificationData.isIncrement
        const quantity = modificationData.quantity
        const fractionedQuantity = modificationData.fractionedQuantity

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

        const modelSchema = getSchema(modelName)
        const Model = getModelByTenant(tenantId, modelName, modelSchema)
        response = await Model
            .findOneAndUpdate({ _id: item._id }, item, { new: true })
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

const processRemove = async (caseProps) => {
    let response

    try {
        const { data: { ids, tenantId }, modelName } = caseProps
        const modelSchema = getSchema(modelName)
        const Model = getModelByTenant(tenantId, modelName, modelSchema)
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
        const { data: { props, tenantId }, modelName } = caseProps
        const modelSchema = getSchema(modelName)
        const Model = getModelByTenant(tenantId, modelName, modelSchema)
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
        const { data: { records, tenantId } , modelName } = caseProps
        const modelSchema = getSchema(modelName)
        const Model = getModelByTenant(tenantId, modelName, modelSchema)
        
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