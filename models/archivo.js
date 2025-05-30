'use strict'
const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate-v2')


const filesSchema = new mongoose.Schema({
    url: {
        type: String,
        required: true
    },
    mimetype: {
        type: String,
        required: true
    },
    filename: {
        type: String,
        required: true
    },
    originalname: {
        type: String,
        required: false
    },
    size: {
        type: Number,
        required: true
    }
}, { timestamps: true })

filesSchema.plugin(mongoosePaginate)


module.exports = filesSchema