const benefitsSchema = require('./benefits')
const brandsSchema = require('./marca')
const businessSchema = require('./empresa')
const clientsSchema = require('./cliente')
const currentAccountsSchema = require('./cuentacorriente')
const dailyBusinessStatisticsSchema = require('./dailyBusinessStatistic')
const documentsSchema = require('./documento')
const entriesSchema = require('./entrada')
const filesSchema = require('./archivo')
const fiscalConditionsSchema = require('./condicionfiscal')
const interfaceStylesSchema = require('./interfaceStyles')
const measureUnitsSchema = require('./unidadmedida')
const outputsSchema = require('./salida')
const paymentMethodSchema = require('./mediopago')
const productSchema = require('./producto')
const tenantsSchema = require('./tenant')
const salesLinesSchema = require('./ventarenglon')
const salePointsSchema = require('./puntoventa')
const salesAreasSchema = require('./zonadeventa')
const salesSchema = require('./venta')
const stockHistoriesSchema = require('./stockHistory')
const typesSchema = require('./rubro')
const usersSchema = require('./usuario')


module.exports = [
    { name: 'benefits', schema: benefitsSchema },
    { name: 'marca', schema: brandsSchema },
    { name: 'empresa', schema: businessSchema },
    { name: 'cliente', schema: clientsSchema },
    { name: 'cuentacorriente', schema: currentAccountsSchema },
    { name: 'dailyBusinessStatistic', schema: dailyBusinessStatisticsSchema },
    { name: 'documento', schema: documentsSchema },
    { name: 'entrada', schema: entriesSchema },
    { name: 'archivo', schema: filesSchema },
    { name: 'condicionfiscal', schema: fiscalConditionsSchema },
    { name: 'interfaceStyles', schema: interfaceStylesSchema },
    { name: 'unidadmedida', schema: measureUnitsSchema },
    { name: 'salida', schema: outputsSchema },
    { name: 'mediopago', schema: paymentMethodSchema },
    { name: 'producto', schema: productSchema },
    { name: 'puntoventa', schema: salePointsSchema },
    { name: 'zonadeventa', schema: salesAreasSchema },
    { name: 'venta', schema: salesSchema },
    { name: 'ventarenglon', schema: salesLinesSchema },
    { name: 'stockHistory', schema: stockHistoriesSchema },
    { name: 'tenant', schema: tenantsSchema },
    { name: 'rubro', schema: typesSchema },
    { name: 'usuario', schema: usersSchema }
]