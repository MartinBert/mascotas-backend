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
        ref: 'archivo'
    }],
}, { timestamps: true });

schema.plugin(mongoosePaginate);

module.exports = mongoose.model('producto', schema);