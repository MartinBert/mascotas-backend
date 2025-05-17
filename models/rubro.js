'use strict'
const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate-v2')


const typesSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true
    },
}, { timestamps: true })

typesSchema.plugin(mongoosePaginate)


module.exports = typesSchema