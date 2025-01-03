'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema
const mongoosePaginate = require('mongoose-paginate-v2')

const schema = new Schema({
    balanceViewExpense: {
        type: Number,
        required: true
    },
    balanceViewIncome: {
        type: Number,
        required: true
    },
    balanceViewProfit: {
        type: Number,
        required: true
    },
    concept: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    dateString: {
        type: String,
        required: true
    },
    salesViewExpense: {
        type: Number,
        required: true
    },
    salesViewIncome: {
        type: Number,
        required: true
    },
    salesViewProfit: {
        type: Number,
        required: true
    }
}, { timestamps: true })

schema.plugin(mongoosePaginate)

module.exports = mongoose.model('dailyBusinessStatistic', schema)