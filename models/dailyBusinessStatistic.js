'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema
const mongoosePaginate = require('mongoose-paginate-v2')

const schema = new Schema({
    concept: {
        type: String,
        required: true
    },
    dailyExpense: {
        type: Number,
        required: true
    },
    dailyIncome: {
        type: Number,
        required: true
    },
    dailyProfit: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        required: true
    }
}, { timestamps: true })

schema.plugin(mongoosePaginate)

module.exports = mongoose.model('dailyBusinessStatistic', schema)