'use strict'

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

const controllersHelper = {
    generateQuery,
    paginationParams
}

module.exports = controllersHelper