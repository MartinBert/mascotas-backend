'use strict'
const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate-v2')


const businessSchema = new mongoose.Schema({
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

businessSchema.plugin(mongoosePaginate)


module.exports = businessSchema