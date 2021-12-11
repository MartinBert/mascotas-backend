'use strict'

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const moongosePaginate = require('mongoose-paginate-v2');


const schema = new Schema({
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

schema.plugin(mongoosePaginate);

module.exports = mongoose.model('cuentacorriente', schema);