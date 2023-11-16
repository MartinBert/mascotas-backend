const mongoose = require('mongoose')
const Schema   = mongoose.Schema
const mongoosePaginate = require('mongoose-paginate-v2')

const schema = new Schema({
    nombre: {
        type: String,
        required: true
    },
    arqueoCaja: {
        type: Boolean,
        required: true
    },
    cierrez: {
        type: Boolean,
        required: true
    },
    planes:[{
        type: Object,
        required: true
    }] //_id, nombre, cuotas, porcentaje
}, { timestamps: true })

schema.plugin(mongoosePaginate)
module.exports = mongoose.model('mediopago', schema)