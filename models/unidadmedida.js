'use strict'
const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate-v2')


const measureUnitsSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true
    },
    fraccionamiento: {
        type: Number,
        required: true
    },
}, { timestamps: true })

measureUnitsSchema.plugin(mongoosePaginate)


module.exports = measureUnitsSchema