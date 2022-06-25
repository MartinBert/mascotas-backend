'use strict';

const mongoose = require('mongoose');
const Schema   = mongoose.Schema;
const mongoosePaginate = require('mongoose-paginate-v2');

const schema = new Schema({
    nombre: {
        type: String
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    perfil:{
        type: Boolean //true super admin, false admin.
    },
    empresa:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'empresa'
    },
    puntoVenta:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'puntoventa'
    }
}, { timestamps: true });

schema.plugin(mongoosePaginate);

module.exports = mongoose.model('usuario', schema);