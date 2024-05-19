'use strict'

const mongoose = require('mongoose')
const Schema   = mongoose.Schema
const mongoosePaginate = require('mongoose-paginate-v2')

const schema = new Schema({
    cantidadFraccionadaStock: {
        type: Number,
        required: true,
        default: 0
    },
    cantidadStock: {
        type: Number,
        required: true,
        default: 0
    },
    codigoBarras: {
        type: String,
        required: true
    },
    codigoProducto: {
        type: String,
        required: true
    },
    gananciaNeta: {
        type: Number,
        required: true,
        default: 0
    },
    gananciaNetaFraccionado: {
        type: Number,
        required: true,
        default: 0
    },
    imagenes:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'archivo'
    }],
    ivaCompra: {
        type: Number,
        required: true,
        default: 0
    },
    ivaVenta: {
        type: Number,
        required: true,
        default: 0
    },
    marca: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'marca'
    },
    margenGanancia: {
        type: Number,
        required: true,
        default: 0
    },
    margenGananciaFraccionado: {
        type: Number,
        required: true,
        default: 0
    },
    nombre: {
        type: String,
        required: true
    },
    porcentajeIvaCompra: {
        type: Number,
        required: true,
        default: 0
    },
    porcentajeIvaVenta: {
        type: Number,
        required: true,
        default: 0
    },
    precioUnitario: {
        type: Number,
        required: true,
        default: 0
    },
    precioVenta: {
        type: Number,
        required: true,
        default: 0
    },
    precioVentaFraccionado: {
        type: Number,
        required: true,
        default: 0
    },
    rubro: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'rubro'
    },
    unidadMedida: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'unidadmedida'
    },
}, { timestamps: true })

schema.plugin(mongoosePaginate)

module.exports = mongoose.model('producto', schema)