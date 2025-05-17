'use strict'
const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate-v2')


const outputsSchema = new mongoose.Schema({
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
    }
}, { timestamps: true })

outputsSchema.plugin(mongoosePaginate)


module.exports = outputsSchema