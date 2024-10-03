'use strict'
const express = require('express')
const router = express.Router()

const BrandModel = require('../models/marca')
const BusinessModel = require('../models/empresa')
const ClientModel = require('../models/cliente')
const CurrentAccountModel = require('../models/cuentacorriente')
const DailyBusinessStatisticModel = require('../models/dailyBusinessStatistic')
const DocumentModel = require('../models/documento')
const EntryModel = require('../models/entrada')
const FileModel = require('../models/archivo')
const FiscalConditionModel = require('../models/condicionfiscal')
const FiscalNoteModel = require('../models/fiscalNote')
const OutputModel = require('../models/salida')
const PaymentMethodModel = require('../models/mediopago')
const ProductModel = require('../models/producto')
const SaleModel = require('../models/venta')
const SaleLineModel = require('../models/ventarenglon')
const SalePointModel = require('../models/puntoventa')
const SalesAreaModel = require('../models/zonadeventa')
const StockHistoryModel = require('../models/stockHistory')
const TypeModel = require('../models/rubro')
const UnitOfMeasureModel = require('../models/unidadmedida')
const UserModel = require('../models/usuario')

const models = [
    BrandModel,
    BusinessModel,
    ClientModel,
    CurrentAccountModel,
    DailyBusinessStatisticModel,
    DocumentModel,
    EntryModel,
    FileModel,
    FiscalConditionModel,
    FiscalNoteModel,
    OutputModel,
    PaymentMethodModel,
    ProductModel,
    SaleModel,
    SaleLineModel,
    SalePointModel,
    SalesAreaModel,
    StockHistoryModel,
    TypeModel,
    UnitOfMeasureModel,
    UserModel
]

const errorResponse = (error) => {
    return {
        code: 500,
        message: 'Error',
        printStackTrace: error
    }
}

const successResponse = {
    code: 200,
    message: 'OK'
}

// ------------------------------------ Delete data -------------------------------------- //
const deleteData = async (request, response) => {
    try {
        const modelsToDelete = models.filter(model => model !== UserModel)
        for (let index = 0; index < modelsToDelete.length; index++) {
            const model = modelsToDelete[index]
            await model.deleteMany()
        }
        await UserModel.deleteMany({ email: { $ne : 'admin@test.com' } })
        response.status(200).send(successResponse)
    } catch (error) {
        console.log(error)
        return response.status(500).send(errorResponse(error))
    }
}

router.delete('/', deleteData)

// ----------------------------------- Generate data ------------------------------------- //
const generateData = async (request, response) => {
    try {
        console.log('Generation of data soon.')
    } catch (error) {
        console.log(error)
        return response.status(500).send(errorResponse(error))
    }
}

router.post('/', generateData)


module.exports = router