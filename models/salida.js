'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema
const mongoosePaginate = require('mongoose-paginate-v2')

const schema = new Schema({
    cantidad: {
        type: Number,
        required: true
    },
    descripcion: {
        type: String,
        required: true
    },
    fecha: {
        type: Date,
        required: true
    },
    fechaString: {
        type: String,
        required: true
    },
    gananciaNeta: {
        type: Number,
        required: true
    },
    ingreso: {
        type: Number,
        required: true
    },
    // A productos se le agrega el atributo cantidadesSalientes y cantidadesFraccionadasSalientes.
    productos: [{ type: Object }],
    usuario: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'usuario'
    },
    ganancia: {
        type: Number,
        required: false
    },
}, { timestamps: true })

schema.plugin(mongoosePaginate)

module.exports = mongoose.model('salida', schema)