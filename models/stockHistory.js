'use strict'
const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate-v2')


const stockHistoriesSchema = new mongoose.Schema({
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
        ref: 'producto',
        required: true
    }
}, { timestamps: true })

stockHistoriesSchema.plugin(mongoosePaginate)


module.exports = stockHistoriesSchema