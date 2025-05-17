'use strict'
const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate-v2')


const dailyBusinessStatisticsSchema = new mongoose.Schema({
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
    dateOrder: {
        type: Number,
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

dailyBusinessStatisticsSchema.plugin(mongoosePaginate)


module.exports = dailyBusinessStatisticsSchema