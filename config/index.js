'use strict'

module.exports = {
    // Local -- test
    // port: process.env.PORT || 8000,
    // database: 'mongodb://localhost:27017/test',

    //Production
    port: process.env.PORT || 80,
    database: 'mongodb://localhost:27017/tienda-mascotas',
    jwt: {
        secretKey: 'K{RYHwN.WC-BBxe{]AD9,CCH%02[4Yn5A%I*?4106r}kP%ySfJ%Pu?u@E,)wh:8',
        expireTime: `${Number.MAX_SAFE_INTEGER}d`
    },
    email: {
        host: 'vps-1803263-x.dattaweb.com',
        port: '5004'
    },
    Socket:{}
}
