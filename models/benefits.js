'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema
const mongoosePaginate = require('mongoose-paginate-v2')

const schema = new Schema({
    description: {
        type: String,
        required: true
    },
    fixedAmountBonus: {
        type: Number,
        required: true
    },
    percentageBonus: {
        type: Number,
        required: true
    },
    productsBonus: [{
        type: { id: mongoose.Schema.Types.ObjectId, quantity: Number },
        required: true
    }],
    purchaseQuantityForActivation: {
        type: Number,
        required: true
    },
    title: {
        type: String,
        required: true
    },
}, { timestamps: true })

schema.plugin(mongoosePaginate)

module.exports = mongoose.model('benefits', schema)