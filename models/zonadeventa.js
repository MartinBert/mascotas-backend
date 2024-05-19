'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema
const mongoosePaginate = require('mongoose-paginate-v2')

const schema = new Schema({
    description: {
        required: false,
        type: String
    },
    discountDecimal: {
        required: true,
        type: Number
    },
    discountPercentage: {
        required: true,
        type: Number
    },
    name: {
        required: true,
        unique: true,
        type: String
    },
    surchargeDecimal: {
        required: true,
        type: Number
    },
    surchargePercentage: {
        required: true,
        type: Number
    }
}, { timestamps: true })

schema.plugin(mongoosePaginate)

module.exports = mongoose.model('zonadeventa', schema)