const keys = require('../services/certificates')
const jwt = require('jsonwebtoken')
const tenantSchema = require('../models/tenant')
const userSchema = require('../models/usuario')
const { getModelByTenant } = require('../config')
const helpers = require('../helpers')
const { private_key, public_key } = keys
const { processRequest, services } = helpers.controllersHelper

const tenantModelName = 'tenants'
const userModelName = 'users'

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


const authController = {
    login(req, res) {
        const TenantModel = getModelByTenant(null, tenantModelName, tenantSchema)
        TenantModel.find({}).exec((error, tenants) => {
            if (error) return res.status(500).send(errorResponse(500, 'Tenants not found.'))

            for (let index = 0; index < tenants.length; index++) {
                const tenantId = tenants[index].cuit
                const UserModel = getModelByTenant(tenantId, userModelName, userSchema)
                const { email, password } = req.body
                UserModel.findOne({ email }).exec((error, user) => {
                    if (error) {
                        res.status(500).send(errorResponse(500, error))
                    } else {
                        validateCredentials(user, password)
                            .then(token => {
                                if (token) {
                                    const responseData = {
                                        tenantId,
                                        token,
                                        userId: user._id
                                    }
                                    res.status(200).send(successResponseWithToken(responseData))
                                }
                            })
                    }
                })
            }
        })
    },

    verifyAuthentication(req, res, next) {
        try {
            const isNewlyUser = req.body.newlyUser ?? false
            if (isNewlyUser) {
                const data = { records: req.body, tenantId: req.params.tenantId }
                const props = { data, modelName: userModelName, service: services.save }
                processRequest(props).then(
                    (result) => { return res.status(200).json(result) },
                    (error) => { return res.status(500).json(errorResponse(500, error)) }
                )

            } else {
                const token = req.headers.authorization
                if (!token) return res.status(403).send({
                    authorized: false
                })
                jwt.verify(token, public_key, { algorithms: ['RS256'] }, (err, loggedUser) => {
                    if (err) return res.status(401).send(errorResponseAuthorization(401, err))
                    const tenantId = (
                        req.headers.tenantId
                        ?? req.headers.tenantid // Axios converts header to lowercase
                        ?? null
                    )
                    const UserModel = getModelByTenant(tenantId, userModelName, userSchema)
                    const { email, password } = loggedUser
                    UserModel.findOne({ email }).exec((error, user) => {
                        if (error) return res.status(500).send(errorResponseAuthorization(500, error))
                        if (user.password === password) {
                            next()
                        } else {
                            return res.status(401).send(errorResponseAuthorization(401, 'Unauthorized'))
                        }
                    })
                })
            }

        } catch (error) {
            console.error(error)
        }
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

module.exports = authController