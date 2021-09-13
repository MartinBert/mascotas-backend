'use strict';

const mongoose = require('mongoose');
const Schema   = mongoose.Schema;
const mongoosePaginate = require('mongoose-paginate-v2');

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

schema.plugin(mongoosePaginate);

module.exports = mongoose.model('salida', schema);