'use strict';
const express = require('express');

const router  = express.Router();

const errorResponse = (error) => {
    return {
        code: 500,
        message: "Error",
        printStackTrace: error
    }
}

const successWithItems = (items) => {
    return {
        code: 200,
        message: 'OK',
        data: items
    }
}

//Autocomplete Options
router.get('/genericAutocompleteFilter', (request, response) => {
    const {model, search, keyToCompare} = request.query;
    const Model = require('../models/' + model);

    Model.paginate({[keyToCompare]: new RegExp(search, 'i')}, {page: 0, limit: 15}, (error, items) => {
        items.docs = items.docs.map(item => {return {_id: item.id, [keyToCompare]: item[keyToCompare]}});
        if (error) return response.status(500).json(errorResponse(error));
        return response.status(200).send(
            successWithItems(items)
        );
    })
});

module.exports = router;