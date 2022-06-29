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
        required: true
    },
    cantidadStock: {
        type: Number,
        required: true
    },
    precioUnitario: {
        type: Number,
        required: true
    },
    margenGanancia: {
        type: Number,
        required: true
    },
    precioVenta: {
        type: Number,
        required: true
    },
    gananciaNeta: {
        type: Number,
        required: true
    },
    porcentajeIvaCompra: {
        type: Number,
        required: true
    },
    ivaCompra: {
        type: Number,
        required: true
    },
    porcentajeIvaVenta: {
        type: Number,
        required: true
    },
    ivaVenta: {
        type: Number,
        required: true
    },
    imagenes:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'archivo'
    }],
}, { timestamps: true });

schema.plugin(mongoosePaginate);

module.exports = mongoose.model('producto', schema);