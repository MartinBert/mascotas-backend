'use strict'
const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate-v2')


const brandSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true
    },
}, { timestamps: true })

brandSchema.plugin(mongoosePaginate)


module.exports = brandSchema