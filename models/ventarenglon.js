const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const mongoosePaginate = require('mongoose-paginate-v2');

const schema = new Schema({
    nombre:{
        type: String,
        required: true
    },
    codigoBarras:{
        type: String,
        required: true
    },
    precioUnitario:{
        type: Number,
        required: true
    },
    porcentajeIva: {
        type: Number,
        required: true
    },
    importeIva: {
        type: Number,
        required: true
    },
    fraccionamiento: {
        type: Number,
        required: true
    },
    fraccionar: {
        type: Boolean,
        required: true
    },
    cantidadUnidades:{
        type: Number,
        required: true
    },
    cantidadQuitadaPorRecargo_enKg:{
        type: Number,
        required: false
    },
    cantidadAgregadaPorDescuento_enKg:{
        type: Number,
        required: false
    },
    cantidadKg:{
        type: Number,
        required: false
    },
    cantidadg:{
        type: Number,
        required: false
    },
    porcentajeRecargoRenglon:{
        type: Number,
        required: false
    },
    porcentajeDescuentoRenglon:{
        type: Number,
        required: false
    },
    recargo:{
        type: Number,
        required: true
    },
    descuento:{
        type: Number,
        required: true
    },
    precioNeto:{
        type: Number,
        required: true
    },
    precioNetoFijo:{
        type: Boolean,
        required: true
    },
    precioBruto:{
        type: Number,
        required: true
    },
}, { timestamps: true });

schema.plugin(mongoosePaginate);

module.exports = mongoose.model('ventarenglon', schema);