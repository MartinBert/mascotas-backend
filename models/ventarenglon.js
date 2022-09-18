const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const mongoosePaginate = require('mongoose-paginate-v2');

const schema = new Schema({
    productoNombre:{
        type: String,
        required: true
    },
    productoCodigoBarras:{
        type: String,
        required: true
    },
    productoPrecioUnitario:{
        type: Number,
        required: true
    },
    productoPorcentajeIva: {
        type: Number,
        required: true
    },
    productoImporteIva: {
        type: Number,
        required: true
    },
    productoFraccionamiento: {
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
    porcentajeDescuentoRenglon:{
        type: Number,
        required: true
    },
    importeDescuentoRenglon:{
        type: Number,
        required: true
    },
    porcentajeRecargoRenglon:{
        type: Number,
        required: true
    },
    importeRecargoRenglon:{
        type: Number,
        required: true
    },
    totalRenglon:{
        type: Number,
        required: true
    },
}, { timestamps: true });

schema.plugin(mongoosePaginate);

module.exports = mongoose.model('ventarenglon', schema);