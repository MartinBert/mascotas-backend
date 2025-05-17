'use strict'
const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate-v2')


const salePointsSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true
    },
    numero: {
        type: Number,
        required: true
    },
}, { timestamps: true })

salePointsSchema.plugin(mongoosePaginate)


module.exports = salePointsSchema