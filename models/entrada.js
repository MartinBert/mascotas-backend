'use strict'
const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate-v2')


const entriesSchema = new mongoose.Schema({
    cantidad: {
        type: Number,
        required: true
    },
    costoTotal: {
        type: Number,
        required: true
    },
    descripcion: {
        type: String,
        required: true
    },
    fecha:{
        type: Date,
        required: true
    },
    fechaString:{
        type: String,
        required: true
    },
    // A productos se le agrega el campo cantidadesEntrantes
    productos: [{ type: Object }],
    usuario: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'usuario'
    },   
}, { timestamps: true })

entriesSchema.plugin(mongoosePaginate)


module.exports = entriesSchema