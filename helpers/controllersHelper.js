'use strict'

const verifyFilters = (queryData) => {
    if (!queryData) return false
    const validValues = Object.values(queryData)
        .filter(value => value !== null && value !== '')
    if (validValues.length === 0) return false
    return true
}

const generateQuery = (request) => {
    const filters = request.query.filters || null
    const queryData = JSON.parse(filters)
    const query = {}
    const existsFilters = verifyFilters(queryData)
    if (!existsFilters) return query
    const queryKeys = Object.keys(queryData)
    const queryValues = Object.values(queryData)
    queryKeys.forEach(function (element, index) {
        if (typeof queryValues[index] === 'string') {
            query[element] = new RegExp(queryValues[index], 'i')
        } else {
            query[element] = queryValues[index]
        }
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
        sort: sortParams ? { [sortParams.param]: sortParams.direction } : null
    }
}

const controllersHelper = {
    generateQuery,
    paginationParams
}

module.exports = controllersHelper