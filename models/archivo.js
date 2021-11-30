'use strict';

const mongoose = require('mongoose');
const Schema   = mongoose.Schema;
const mongoosePaginate = require('mongoose-paginate-v2');

const schema = new Schema({
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
}, { timestamps: true });

schema.plugin(mongoosePaginate);

module.exports = mongoose.model('archivo', schema);