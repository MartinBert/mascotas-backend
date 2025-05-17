'use strict'
const mongoose = require('mongoose')

const tenantsDbName = 'tenants'
const db_url = `mongodb://localhost:27017/${tenantsDbName}`

const mongoOptions = {
    // useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // useFindAndModify: false,
    // autoIndex: true,
    // poolSize: 10,
    // bufferMaxEntries: 0,
    connectTimeoutMS: 10000,
    socketTimeoutMS: 30000,
}

const connect = () => mongoose.createConnection(db_url, mongoOptions)

const connectToMongoDB = () => {
    const db = connect(db_url)
    db.on('open', () => {
        console.log(`Mongoose connection open to ${JSON.stringify(db_url)}`)
    })
    db.on('error', (err) => {
        console.log(`Mongoose connection error: ${err} with connection info ${JSON.stringify(db_url)}`)
        process.exit(0)
    })
    return db
}

const getModelByTenant = (tenantId = null, modelName, modelSchema) => {
    const tenantsDb = connectToMongoDB()
    if (!tenantsDb) {
        return console.log('error')
    } else {
        let activeDb
        const dbName = tenantId // CUIT
        if (!dbName || modelName === tenantsDbName) {
            activeDb = tenantsDb
        } else {
            activeDb = tenantsDb.useDb(dbName, { useCache: true })
            console.log(`DB switched to ${dbName}`)
        }
        const dbModel = activeDb.model(modelName, modelSchema)
        return dbModel
    }
}


module.exports = {
    getModelByTenant,

    // Local -- test
    port: process.env.PORT || 8000,
    database: 'mongodb://localhost:27017/test',

    //Production
    // port: process.env.PORT || 80,
    // database: 'mongodb://localhost:27017/tienda-mascotas',

    jwt: {
        secretKey: 'K{RYHwN.WC-BBxe{]AD9,CCH%02[4Yn5A%I*?4106r}kP%ySfJ%Pu?u@E,)wh:8',
        expireTime: `${Number.MAX_SAFE_INTEGER}d`
    },
    email: {
        host: 'vps-1803263-x.dattaweb.com',
        port: '5004'
    },
    Socket: {}
}
