'use strict';

const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

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
    cantidadStock: {
        type: Number,
        required: true
    },
    precioUnitario: {
        type: Number,
    },
    margenGanancia: {
        type: Number,
    },
    precioVenta: {
        type: Number,
    },
    gananciaNeta: {
        type: Number,
    },
    iva: {
        type: Number,
    },
    imagenes:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Archivo'
    }],
}, { timestamps: true });

module.exports = mongoose.model('producto', schema);