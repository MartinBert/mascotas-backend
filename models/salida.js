'use strict';

const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const schema = new Schema({
    descripcion: {
        type: String,
        required: true
    },
    fecha:{
        type: Date,
        required: true
    },
    cantidad: {
        type: Number,
        required: true
    },
    gananciaNeta: {
        type: Number,
        required: true
    },   
    productos: [{ type: Object }],   
    usuario: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Usuario'
    },   
}, { timestamps: true });

module.exports = mongoose.model('salida', schema);