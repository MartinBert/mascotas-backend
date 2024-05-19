'use strict'

const mongoose = require('mongoose')
const Schema   = mongoose.Schema
const mongoosePaginate = require('mongoose-paginate-v2')

const schema = new Schema({
    razonSocial: {
        type: String,
        required: true
    },
    cuit: {
        type: String,
        unique: true,
        required: true
    },
    actividad: {
        type: String,
        required: true
    },
    fechaInicioActividad: {
        type: Date,
        required: true
    },
    ingresosBrutos: {
        type: String,
        required: true
    },
    direccion: {
        type: String,
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
    logo:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'archivo'
    },
    condicionFiscal:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'condicionfiscal'
    },
    puntosVenta:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'puntoventa'
    }],
}, { timestamps: true })

schema.plugin(mongoosePaginate)

module.exports = mongoose.model('empresa', schema)