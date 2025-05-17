'use strict'
const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate-v2')


const currentAccountsSchema = new mongoose.Schema({
    usuario: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'usuario',
        required:true
    },

    producto:[{ type: Object,
        required:true
    }],

    fechaUltimpoPago:{
        type: Date,
        required:true
    },

    deuda:{
        type:Number,
        required:true
    },

    deudaMaxima:{
        type:Number,
        required:true
    },

    estado:{
        type:Boolean
    }
})

currentAccountsSchema.plugin(mongoosePaginate)


module.exports = currentAccountsSchema