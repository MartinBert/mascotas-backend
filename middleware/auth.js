const keys = require('../services/certificates')
const jwt = require('jsonwebtoken')
const tenantSchema = require('../models/tenant')
const userSchema = require('../models/usuario')
const { getModelByTenant } = require('../config')
const helpers = require('../helpers')
const { private_key, public_key } = keys
const { processRequest, services } = helpers.controllersHelper

const tenantModelName = 'tenant'
const userModelName = 'usuario'

const errorResponse = (code, error) => {
    return {
        code,
        message: 'Error',
        printStackTrace: error
    }
}

const errorResponseAuthorization = (code, error) => {
    return {
        code,
        message: 'Error',
        authorized: false,
        printStackTrace: error
    }
}

const successResponseWithToken = (responseData) => {
    const { tenantId, token, userId } = responseData
    return {
        code: 200,
        message: 'OK',
        tenantId,
        token,
        userId
    }
}

const validateCredentials = async (user, password) => {
    let token = null
    const match = (password === user.password) ? 'valid' : null
    if (match) {
        token = jwt.sign(
            {
                'email': user.email,
                'password': user.password
            },
            private_key, { algorithm: 'RS256' }
        )
    }
    return token
}


const authController = {
    login(req, res) {
        const props = {
            populateParams: ['empresa', 'puntoVenta'],
            refModelsNames: ['empresa', 'puntoventa'],
            service: services.findAllUsers
        }
        processRequest(props).then(
            (allUsers) => {
                const { email, password } = req.body
                const requestingUser = allUsers.data.find(user => user.email === email)

                if (!requestingUser) {
                    return res.status(404).send(errorResponseAuthorization(404, 'User not found.'))

                } else {
                    const TenantModel = getModelByTenant(null, tenantModelName, tenantSchema)
                    const query = requestingUser?.empresa?.cuit
                        ? { cuit: requestingUser.empresa.cuit }
                        : { email }
                    TenantModel.findOne(query).exec((error, tenant) => {

                        if (error) {
                            return res.status(500).send(errorResponse(500, error))

                        } else if (!tenant) {
                            return res.status(404).send(errorResponseAuthorization(404, 'Tenant not found.'))

                        } else {
                            const tenantId = tenant.cuit
                            const UserModel = getModelByTenant(tenantId, userModelName, userSchema)
                            UserModel.findOne({ email }).exec((error, user) => {

                                if (error) {
                                    return res.status(500).send(errorResponse(500, error))

                                } if (!user) {
                                    return res.status(404).send(errorResponseAuthorization(404, 'User not found.'))
                                    
                                } else {
                                    validateCredentials(user, password)
                                        .then(token => {
                                            if (token) {
                                                const responseData = {
                                                    tenantId,
                                                    token,
                                                    userId: user._id
                                                }
                                                return res.status(200).send(successResponseWithToken(responseData))
                                            }
                                        })
                                }
                            })
                        }
                    })
                }
            },
            (error) => { return res.status(500).json(errorResponse(500, error)) }
        )
    },

    verifyAuthentication(req, res, next) {
        /* Axios converts headers to lowercase:
                Authorization: authorization
                newlyUser: newlyuser
                tenantId: tenantid
        */
        try {
            const isNewlyUser = req.headers.newlyuser ?? false

            if (isNewlyUser) {
                const props = {
                    modelName: userModelName,
                    records: req.body,
                    service: services.save,
                    tenantId: req.headers.tenantid
                }
                processRequest(props).then(
                    (result) => { return res.status(200).json(result) },
                    (error) => { return res.status(500).json(errorResponse(500, error)) }
                )

            } else {
                const token = req.headers.authorization
                if (!token) {
                    return res.status(403).send({ authorized: false })
                }
                jwt.verify(token, public_key, { algorithms: ['RS256'] }, (err, loggedUser) => {
                    if (err) return res.status(401).send(errorResponseAuthorization(401, err))
                    const tenantId = req.headers.tenantid ?? null
                
                    const UserModel = getModelByTenant(tenantId, userModelName, userSchema)
                    const { email, password } = loggedUser
                    UserModel.findOne({ email }).exec((error, user) => {
                        if (error) return res.status(500).send(errorResponseAuthorization(500, error))
                        if (!user) return res.status(404).send(errorResponseAuthorization(404, 'User not found.'))
                        if (user.password === password) {
                            return next()
                        } else {
                            return res.status(401).send(errorResponseAuthorization(401, 'Unauthorized'))
                        }
                    })
                })
            }

        } catch (error) {
            console.error(error)
        }
    },

    withoutAuthentication(req, res, next) {
        return next()
    }
}

module.exports = authController