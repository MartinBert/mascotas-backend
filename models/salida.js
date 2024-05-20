'use strict'

const mongoose = require('mongoose')
<<<<<<< HEAD
const Schema   = mongoose.Schema
const mongoosePaginate = require('mongoose-paginate-v2')

const schema = new Schema({
=======
const Schema = mongoose.Schema
const mongoosePaginate = require('mongoose-paginate-v2')

const schema = new Schema({
    cantidad: {
        type: Number,
        required: true
    },
>>>>>>> e0f49f1e714cfd78dc0198823265fcac8dbbe400
    descripcion: {
        type: String,
        required: true
    },
<<<<<<< HEAD
    fecha:{
        type: Date,
        required: true
    },
    fechaString:{
        type: String,
        required: true
    },
    cantidad: {
=======
    fecha: {
        type: Date,
        required: true
    },
    fechaString: {
        type: String,
        required: true
    },
    ganancia: {
>>>>>>> e0f49f1e714cfd78dc0198823265fcac8dbbe400
        type: Number,
        required: true
    },
    gananciaNeta: {
        type: Number,
        required: true
<<<<<<< HEAD
    },   

    // A productos se le agrega el atributo cantidadesSalientes y cantidadesFraccionadasSalientes.
    productos: [{ type: Object }], 
      
    usuario: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'usuario'
    },   
=======
    },

    // A productos se le agrega el atributo cantidadesSalientes y cantidadesFraccionadasSalientes.
    productos: [{ type: Object }],

    usuario: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'usuario'
    },
>>>>>>> e0f49f1e714cfd78dc0198823265fcac8dbbe400
}, { timestamps: true })

schema.plugin(mongoosePaginate)

module.exports = mongoose.model('salida', schema)