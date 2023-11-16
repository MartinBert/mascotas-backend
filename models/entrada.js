'use strict'

const mongoose = require('mongoose')
const Schema   = mongoose.Schema
const mongoosePaginate = require('mongoose-paginate-v2')

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
    costoTotal: {
        type: Number,
        required: true
    },
    // A productos se le agrega el campo cantidadesEntrantes
    productos: [{ type: Object }],   
    usuario: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'usuario'
    },   
}, { timestamps: true })

schema.plugin(mongoosePaginate)

module.exports = mongoose.model('entrada', schema)