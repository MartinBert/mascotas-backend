'use strict'
const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate-v2')


const paymentMethodSchema = new mongoose.Schema({
    arqueoCaja: {
        type: Boolean,
        required: true
    },
    cierrez: {
        type: Boolean,
        required: true
    },
    nombre: {
        type: String,
        required: true
    },
    normalizedName: {
        type: String,
        required: true
    },
    planes:[{
        type: Object,
        required: true
    }] //_id, cuotas, nombre, normalizedName, porcentaje
}, { timestamps: true })

paymentMethodSchema.plugin(mongoosePaginate)


module.exports = paymentMethodSchema