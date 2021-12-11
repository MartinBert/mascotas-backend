const express = require('express');
const Model   = require('../models/cuentacorriente');
const router  = express.Router();

const errorResponse = (error) => {
    return {
        code: 500,
        message: "Error",
        printStackTrace: error
    }
}

const successResponse = {
    code: 200,
    message: 'OK'
}

const successWithItems = (items) => {
    return {
        code: 200,
        message: 'OK',
        data: items
    }
}

