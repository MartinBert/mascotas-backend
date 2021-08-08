'use strict';

const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const schema = new Schema({
    nombre: {
        type: String,
        required: true
    },
}, { timestamps: true });

module.exports = mongoose.model('rubro', schema);