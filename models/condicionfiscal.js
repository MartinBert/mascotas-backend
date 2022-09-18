'use strict';

const mongoose = require('mongoose');
const Schema   = mongoose.Schema;
const mongoosePaginate = require('mongoose-paginate-v2');

const schema = new Schema({
    nombre: {
        type: String
    },
    adicionaIva: {
        type: Boolean
    }
}, { timestamps: true });

schema.plugin(mongoosePaginate);

module.exports = mongoose.model('condicionfiscal', schema);