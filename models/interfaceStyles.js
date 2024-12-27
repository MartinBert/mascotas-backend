'use strict'

const mongoose = require('mongoose')
const Schema   = mongoose.Schema

const schema = new Schema({
    darknessBackgroundPrimaryColor: {
        type: String,
        required: true
    },
    darknessBackgroundSecondaryColor: {
        type: String,
        required: true
    },
    darknessButtonsPrimaryColor: {
        type: String,
        required: true
    },
    darknessButtonsSecondaryColor: {
        type: String,
        required: true
    },
    isDarknessActive: {
        type: Boolean,
        required: true
    },
    lightBackgroundPrimaryColor: {
        type: String,
        required: true
    },
    lightBackgroundSecondaryColor: {
        type: String,
        required: true
    },
    lightButtonsPrimaryColor: {
        type: String,
        required: true
    },
    lightButtonsSecondaryColor: {
        type: String,
        required: true
    },
    typeOfDailyStatisticsView: {
        type: String,
        required: false
    }
}, { timestamps: true })


module.exports = mongoose.model('interfaceStyles', schema)