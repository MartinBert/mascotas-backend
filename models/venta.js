const mongoose = require('mongoose');
const Schema   = mongoose.Schema;
const mongoosePaginate = require('mongoose-paginate-v2');

const schema = new Schema({
    productos:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'producto'
    }],
    renglones:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ventarenglon'
    }],
    documento:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'documento'
    },
    documentoLetra:{
        type: String,
        required: true
    },
    documentoFiscal:{
        type: Boolean,
        required: true
    },
    documentoCodigo:{
        type: Boolean,
        required: true
    },
    empresa:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'empresa'
    },
    empresaRazonSocial:{
        type: String,
        required: true
    },
    empresaDireccion:{
        type: String,
        required: true
    },
    empresaCondicionIva:{
        type: String,
        required: true
    },
    empresaCuit:{
        type: String,
        required: true
    },
    empresaIngresosBrutos:{
        type: String,
        required: true
    },
    empresaInicioActividad:{
        type: String,
        required: true
    },
    empresaLogo:{
        type: String,
        required: true
    },
    puntoVenta:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'puntoventa'
    },
    puntoVentaNumero: {
        type: Number,
        required: true
    },
    puntoVentaNombre:{
        type: String,
        required: true
    },
    numeroFactura:{
        type: Number,
        required: true
    },
    numeroCompletoFactura:{
        type: String,
        required: true
    },
    condicionVenta:{
        type: String,
        required: true
    },
    cliente:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'cliente'
    },
    clienteRazonSocial:{
        type: String,
        required: true
    },
    clienteDireccion:{
        type: String,
        required: true
    },
    clienteIdentificador:{
        type: String,
        required: true
    },
    clienteCondicionIva:{
        type: String,
        required: true
    },
    clienteDocumentoReceptor:{
        type: Number,
        required: true
    },
    mediosPago:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'mediopago'
    }],
    mediosPagoNombres: [{
        type: String,
        required: true
    }],
    planesPago:[{
        type: Object,
        required: true
    }],
    planesPagoNombres:[{
        type: String,
        required: true
    }],
    fechaEmision:{
        type: Date,
        required: true
    },
    fechaEmisionString:{
        type: String,
        required: true
    },
    cae:{
        type: String,
        required: true
    },
    vencimientoCae:{
        type: String,
        required: true
    },
    porcentajeDescuentoGlobal:{
        type: Number,
        required: true
    },
    porcentajeRecargoGlobal:{
        type: Number,
        required: true
    },
    totalDescuento:{
        type: Number,
        required: true
    },
    totalRecargo:{
        type: Number,
        required: true
    },
    totalDescuentoLineas:{
        type: Number,
        required: true
    },
    totalRecargoLineas:{
        type: Number,
        required: true
    },
    iva21:{
        type: Number,
        required: true
    },
    iva10:{
        type: Number,
        required: true
    },
    iva27:{
        type: Number,
        required: true
    },
    baseImponible21:{
        type: Number,
        required: true
    },
    baseImponible10:{
        type: Number,
        required: true
    },
    baseImponible27:{
        type: Number,
        required: true
    },
    importeIva:{
        type: Number,
        required: true
    },
    subTotal:{
        type: Number,
        required: true
    },
    total:{
        type: Number,
        required: true
    },
}, { timestamps: true });

schema.plugin(mongoosePaginate);

module.exports = mongoose.model('venta', schema);