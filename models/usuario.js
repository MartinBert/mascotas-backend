'use strict'
const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate-v2')


const usersSchema = new mongoose.Schema({
    email: {
        type: String,
        unique: true,
        required: true
    },
    nombre: {
        type: String
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
}, { timestamps: true })

usersSchema.plugin(mongoosePaginate)


module.exports = usersSchema