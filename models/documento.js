const mongoose = require('mongoose')
const Schema = mongoose.Schema
const mongoosePaginate = require('mongoose-paginate-v2')

const schema = new Schema({
    cashRegister: {
        type: Boolean,
        required: true
    },
    codigoUnico: {
        type: String,
        required: true
    },
    fiscal: {
        type: Boolean,
        required: true
    },
    letra: {
        type: String,
        required: true
    },
    nombre: {
        type: String,
        required: true
    },
    normalizedName: {
        type: String,
        required: true
    },
    presupuesto: {
        type: Boolean,
        required: true
    },
    remito: {
        type: Boolean,
        required: true
    },
    ticket: {
        type: Boolean,
        required: true
    }
}, { timestamps: true })

schema.plugin(mongoosePaginate)

module.exports = mongoose.model('documento', schema)