const BenefitsModel = require('./benefits')
const BrandsModel = require('./marca')
const BusinessModel = require('./empresa')
const ClientsModel = require('./cliente')
const CurrentAccountsModel = require('./cuentacorriente')
const DailyBusinessStatisticsModel = require('./dailyBusinessStatistic')
const DocumentsModel = require('./documento')
const EntriesModel = require('./entrada')
const FilesModel = require('./archivo')
const FiscalConditionsModel = require('./condicionfiscal')
const InterfaceStylesModel = require('./interfaceStyles')
const MeasureUnitsModel = require('./unidadmedida')
const OutputsModel = require('./salida')
const PaymentMethodModel = require('./mediopago')
const ProductModel = require('./producto')
const SaleLinesModel = require('./ventarenglon')
const SalePointsModel = require('./puntoventa')
const SalesAreasModel = require('./zonadeventa')
const SalesModel = require('./venta')
const StockHistoriesModel = require('./stockHistory')
const TypesModel = require('./rubro')
const UsersModel = require('./usuario')


module.exports = [
    { name: 'benefits', model: BenefitsModel },
    { name: 'brands', model: BrandsModel },
    { name: 'business', model: BusinessModel },
    { name: 'clients', model: ClientsModel },
    { name: 'currentAccounts', model: CurrentAccountsModel },
    { name: 'dailyBusinessStatistics', model: DailyBusinessStatisticsModel },
    { name: 'documents', model: DocumentsModel },
    { name: 'entries', model: EntriesModel },
    { name: 'files', model: FilesModel },
    { name: 'fiscalConditions', model: FiscalConditionsModel },
    { name: 'interfaceStyles', model: InterfaceStylesModel },
    { name: 'measureUnits', model: MeasureUnitsModel },
    { name: 'outputs', model: OutputsModel },
    { name: 'paymentMethods', model: PaymentMethodModel },
    { name: 'products', model: ProductModel },
    { name: 'saleLines', model: SaleLinesModel },
    { name: 'salePoints', model: SalePointsModel },
    { name: 'sales', model: SalesAreasModel },
    { name: 'salesAreas', model: SalesModel },
    { name: 'stockHistories', model: StockHistoriesModel },
    { name: 'types', model: TypesModel },
    { name: 'users', model: UsersModel }
]