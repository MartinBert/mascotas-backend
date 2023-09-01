'use strict';

const mongoose = require('mongoose');
const Schema   = mongoose.Schema;
const mongoosePaginate = require('mongoose-paginate-v2');

const schema = new Schema({
    nombre: {
        type: String,
        required: true
    },
    codigoProducto: {
        type: String,
        required: true
    },
    codigoBarras: {
        type: String,
        required: true
    },
    marca: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'marca'
    },   
    rubro: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'rubro'
    },
    unidadMedida: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'unidadmedida'
    },
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
    precioUnitario: {
        type: Number,
        required: true,
        default: 0
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
    precioVenta: {
        type: Number,
        required: true,
        default: 0
    },
    gananciaNeta: {
        type: Number,
        required: true,
        default: 0
    },
    precioVentaFraccionado: {
        type: Number,
        required: true,
        default: 0
    },
    gananciaNetaFraccionado: {
        type: Number,
        required: true,
        default: 0
    },
    porcentajeIvaCompra: {
        type: Number,
        required: true,
        default: 0
    },
    ivaCompra: {
        type: Number,
        required: true,
        default: 0
    },
    porcentajeIvaVenta: {
        type: Number,
        required: true,
        default: 0
    },
    ivaVenta: {
        type: Number,
        required: true,
        default: 0
    },
    imagenes:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'archivo'
    }],
}, { timestamps: true });

schema.plugin(mongoosePaginate);

module.exports = mongoose.model('producto', schema);