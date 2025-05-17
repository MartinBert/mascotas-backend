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
const saleLinesSchema = require('./ventarenglon')
const salePointsSchema = require('./puntoventa')
const salesAreasSchema = require('./zonadeventa')
const salesSchema = require('./venta')
const stockHistoriesSchema = require('./stockHistory')
const typesSchema = require('./rubro')
const usersSchema = require('./usuario')


module.exports = [
    { name: 'benefits', schema: benefitsSchema },
    { name: 'brands', schema: brandsSchema },
    { name: 'business', schema: businessSchema },
    { name: 'clients', schema: clientsSchema },
    { name: 'currentAccounts', schema: currentAccountsSchema },
    { name: 'dailyBusinessStatistics', schema: dailyBusinessStatisticsSchema },
    { name: 'documents', schema: documentsSchema },
    { name: 'entries', schema: entriesSchema },
    { name: 'files', schema: filesSchema },
    { name: 'fiscalConditions', schema: fiscalConditionsSchema },
    { name: 'interfaceStyles', schema: interfaceStylesSchema },
    { name: 'measureUnits', schema: measureUnitsSchema },
    { name: 'outputs', schema: outputsSchema },
    { name: 'paymentMethods', schema: paymentMethodSchema },
    { name: 'products', schema: productSchema },
    { name: 'saleLines', schema: saleLinesSchema },
    { name: 'salePoints', schema: salePointsSchema },
    { name: 'sales', schema: salesAreasSchema },
    { name: 'salesAreas', schema: salesSchema },
    { name: 'stockHistories', schema: stockHistoriesSchema },
    { name: 'tenants', schema: tenantsSchema },
    { name: 'types', schema: typesSchema },
    { name: 'users', schema: usersSchema }
]