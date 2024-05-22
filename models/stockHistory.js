'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema
const mongoosePaginate = require('mongoose-paginate-v2')

const schema = new Schema({
    date: {
        type: Date,
        required: true
    },
    dateString: {
        type: String,
        required: true
    },
    entries: {
        type: Number,
        required: true
    },
    itIsAManualCorrection: {
        type: Boolean,
        required: true
    },
    outputs: {
        type: Number,
        required: true
    },
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'product',
        required: true
    }
}, { timestamps: true })

schema.plugin(mongoosePaginate)

module.exports = mongoose.model('stockHistory', schema)