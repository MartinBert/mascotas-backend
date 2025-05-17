'use strict'
const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate-v2')


const tenantsSchema = new mongoose.Schema({
    cuit: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
}, { timestamps: true })

tenantsSchema.plugin(mongoosePaginate)


module.exports = tenantsSchema