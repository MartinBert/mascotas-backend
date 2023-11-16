const mongoose = require('mongoose')
const Schema = mongoose.Schema
const mongoosePaginate = require('mongoose-paginate-v2')

const schema = new Schema({
    amountGross:{
        type: Number,
        required: true
    },
    amountDifference:{ // amountRounded - amountNet
        type: Number,
        required: true
    },
    amountNet:{
        type: Number,
        required: true
    },
    amountRounded:{ // rounded amountNet
        type: Number,
        required: true
    },
    business:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'empresa', 
        required: true
    },
    businessAddress:{
        type: String,
        required: true
    },
    businessCuit:{
        type: String,
        required: true
    },
    businessGrossIncomes:{
        type: String,
        required: true
    },
    businessIvaCondition:{
        type: String,
        required: true
    },
    businessLogo:{
        type: String,
        required: true
    },
    businessName:{
        type: String,
        required: true
    },
    businessStartOfActivities:{
        type: String,
        required: true
    },
    cae:{
        type: String,
    },
    caeExpirationDate:{
        type: String,
    },
    client:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'cliente',
        required: true
    },
    clientName:{
        type: String,
        required: true
    },
    clientAddress:{
        type: String,
        required: true
    },
    clientIdentifier:{
        type: String,
        required: true
    },
    clientIvaCondition:{
        type: String,
        required: true
    },
    clientReceiverDocument:{
        type: Number,
        required: true
    },
    concept:{
        type: String,
        required: true
    },
    date:{
        type: Date,
        required: true
    },
    dateString:{
        type: String,
        required: true
    },
    fiscalNote:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'documento',
        required: true
    },
    fiscalNoteCode:{
        type: String,
        required: true
    },
    fiscalNoteLetter:{
        type: String,
        required: true
    },
    fiscalNoteNumber:{
        type: Number,
        required: true
    },
    fiscalNoteNumberComplete:{
        type: String,
        required: true
    },
    index:{
        type: Number,
        required: true
    },
    isFiscal:{
        type: Boolean,
        required: true
    },
    iva10:{
        type: Number,
        required: true
    },
    iva21:{
        type: Number,
        required: true
    },
    iva27:{
        type: Number,
        required: true
    },
    ivaTaxBase10:{
        type: Number,
        required: true
    },
    ivaTaxBase21:{
        type: Number,
        required: true
    },
    ivaTaxBase27:{
        type: Number,
        required: true
    },
    ivaTotal:{
        type: Number,
        required: true
    },
    paymentMethods:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'mediopago',
        required: true
    }],
    paymentMethodsNames: [{
        type: String,
        required: true
    }],
    paymentPlans:[{
        type: Object,
        required: true
    }],
    paymentPlansNames:[{
        type: String,
        required: true
    }],
    salePoint:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'puntoventa',
        required: true
    },
    salePointName: {
        type: String,
        required: true
    },
    salePointNumber:{
        type: Number,
        required: true
    },
    subAmount:{
        type: Number,
        required: true
    },
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'usuario',
        required: true
    },
}, { timestamps: true })

schema.plugin(mongoosePaginate)

module.exports = mongoose.model('fiscalNote', schema)