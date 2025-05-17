'use strict'
const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate-v2')


const fiscalConditionsSchema = new mongoose.Schema({
    nombre: {
        type: String
    },
    adicionaIva: {
        type: Boolean
    }
}, { timestamps: true })

fiscalConditionsSchema.plugin(mongoosePaginate)


module.exports = fiscalConditionsSchema