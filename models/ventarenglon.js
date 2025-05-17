'use strict'
const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate-v2')


const saleLinesSchema = new mongoose.Schema({
    cantidadAgregadaPorDescuento_enKg: {
        type: Number,
        required: false
    },
    cantidadg: {
        type: Number,
        required: false
    },
    cantidadKg: {
        type: Number,
        required: false
    },
    cantidadQuitadaPorRecargo_enKg: {
        type: Number,
        required: false
    },
    cantidadUnidades: {
        type: Number,
        required: true
    },
    cantidadUnidadesFraccionadas: {
        type: Number,
        required: true
    },
    codigoBarras: {
        type: String,
        required: true
    },
    descuento: {
        type: Number,
        required: true
    },
    fraccionamiento: {
        type: Number,
        required: true
    },
    fraccionar: {
        type: Boolean,
        required: true
    },
    importeIva: {
        type: Number,
        required: true
    },
    nombre: {
        type: String,
        required: true
    },
    nota: {
        type: String,
        required: false
    },
    porcentajeDescuentoRenglon: {
        type: Number,
        required: false
    },
    porcentajeIva: {
        type: Number,
        required: true
    },
    porcentajeRecargoRenglon: {
        type: Number,
        required: false
    },
    precioBruto: {
        type: Number,
        required: true
    },
    precioListaUnitario: {
        type: Number,
        required: true
    },
    precioNeto: {
        type: Number,
        required: true
    },
    precioNetoFijo: {
        type: Boolean,
        required: true
    },
    precioUnitario: {
        type: Number,
        required: true
    },
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'producto',
        required: true
    },
    profit: {
        type: Number,
        required: true
    },
    recargo: {
        type: Number,
        required: true
    },
}, { timestamps: true })

saleLinesSchema.plugin(mongoosePaginate)


module.exports = saleLinesSchema