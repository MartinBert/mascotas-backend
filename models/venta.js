'use strict'
const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate-v2')


const salesSchema = new mongoose.Schema({
    associatedVouchers: [{
        type: Object,
        required: false
    }],
    baseImponible21: {
        type: Number,
        required: true
    },
    baseImponible10: {
        type: Number,
        required: true
    },
    baseImponible27: {
        type: Number,
        required: true
    },
    buyers: [{
        type: Object,
        required: false
    }],
    cae: {
        type: String,
    },
    cliente: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'cliente',
        required: true
    },
    clienteDireccion: {
        type: String,
        required: true
    },
    clienteCondicionIva: {
        type: String,
        required: true
    },
    clienteDocumentoReceptor: {
        type: Number,
        required: true
    },
    clienteIdentificador: {
        type: String,
        required: true
    },
    clienteRazonSocial: {
        type: String,
        required: true
    },
    condicionVenta: {
        type: String,
        required: true
    },
    documento: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'documento',
        required: true
    },
    documentoCodigo: {
        type: String,
        required: true
    },
    documentoFiscal: {
        type: Boolean,
        required: true
    },
    documentoLetra: {
        type: String,
        required: true
    },
    empresa: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'empresa',
        required: true
    },
    empresaCondicionIva: {
        type: String,
        required: true
    },
    empresaCuit: {
        type: String,
        required: true
    },
    empresaDireccion: {
        type: String,
        required: true
    },
    empresaIngresosBrutos: {
        type: String,
        required: true
    },
    empresaInicioActividad: {
        type: String,
        required: true
    },
    empresaLogo: {
        type: String,
        required: false
    },
    empresaRazonSocial: {
        type: String,
        required: true
    },
    fechaEmision: {
        type: Date,
        required: true
    },
    fechaEmisionString: {
        type: String,
        required: true
    },
    fiscalNoteConcept: {
        type: String,
        required: false
    },
    importeIva: {
        type: Number,
        required: true
    },
    indice: {
        type: Number,
        required: true
    },
    iva: [{
        type: Object,
        required: false
    }],
    iva21: {
        type: Number,
        required: true
    },
    iva10: {
        type: Number,
        required: true
    },
    iva27: {
        type: Number,
        required: true
    },
    mediosPago: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'mediopago',
        required: true
    }],
    mediosPagoNombres: [{
        type: String,
        required: true
    }],
    numeroFactura: {
        type: Number,
        required: true
    },
    numeroCompletoFactura: {
        type: String,
        required: true
    },
    optionals: [{
        type: Object,
        required: false
    }],
    planesPago: [{
        type: Object,
        required: true
    }],
    planesPagoNombres: [{
        type: String,
        required: true
    }],
    porcentajeDescuentoGlobal: {
        type: Number,
        required: false
    },
    porcentajeRecargoGlobal: {
        type: Number,
        required: false
    },
    profit: {
        type: Number,
        required: true
    },
    puntoVenta: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'puntoventa',
        required: true
    },
    puntoVentaNombre: {
        type: String,
        required: true
    },
    puntoVentaNumero: {
        type: Number,
        required: true
    },
    renglones: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ventarenglon',
        required: true
    }],
    subTotal: {
        type: Number,
        required: true
    },
    taxes: [{
        type: Object,
        required: false
    }],
    total: {
        type: Number,
        required: true
    },
    totalDescuento: {
        type: Number,
        required: true
    },
    totalDiferencia: {
        type: Number,
        required: true
    },
    totalRecargo: {
        type: Number,
        required: true
    },
    totalRedondeado: {
        type: Number,
        required: true
    },
    usuario: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'usuario',
        required: true
    },
    vencimientoCae: {
        type: String,
    }
}, { timestamps: true })

salesSchema.plugin(mongoosePaginate)


module.exports = salesSchema