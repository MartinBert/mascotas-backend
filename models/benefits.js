'use strict'
const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate-v2')


const benefitsSchema = new mongoose.Schema({
    activeBenefits: {
        type: {
            fixedAmountBonus: Boolean,
            percentageBonus: Boolean,
            productsBonus: Boolean
        },
        required: true
    },
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
        type: {
            id: mongoose.Schema.Types.ObjectId,
            name: String,
            quantity: Number
        },
        required: true
    }],
    purchaseAmountForActivation: {
        type: Number,
        required: true
    },
    purchaseConditionsForActivation: {
        type: { amount: Boolean, quantity: Boolean },
        required: true
    },
    purchaseQuantityForActivation: {
        type: Number,
        required: true
    },
    title: {
        type: String,
        required: true
    },
}, { timestamps: true })

benefitsSchema.plugin(mongoosePaginate)


module.exports = benefitsSchema