const mongoose = require('mongoose')
const Schema   = mongoose.Schema
const mongoosePaginate = require('mongoose-paginate-v2')

const schema = new Schema({
    arqueoCaja: {
        type: Boolean,
        required: true
    },
    cierrez: {
        type: Boolean,
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
    planes:[{
        type: Object,
        required: true
    }] //_id, cuotas, nombre, normalizedName, porcentaje
}, { timestamps: true })

schema.plugin(mongoosePaginate)
module.exports = mongoose.model('mediopago', schema)