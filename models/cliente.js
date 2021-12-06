'use strict';

const mongoose = require('mongoose');
const Schema   = mongoose.Schema;
const mongoosePaginate = require('mongoose-paginate-v2');

const schema = new Schema({
    razonSocial: {
        type: String,
        required: true
    },
    cuit: {
        type: String,
        required: true
    },
    condicionFiscal: {
        type: Object,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    telefono: {
        type: String,
        required: true
    },
    direccion: {
        type: String,
        required: true
    },
    ciudad: {
        type: String,
        required: true
    },
    provincia: {
        type: String,
        required: true
    }
}, { timestamps: true });

schema.plugin(mongoosePaginate);

module.exports = mongoose.model('cliente', schema);