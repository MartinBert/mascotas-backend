const keys = require('../services/certificates')
const User = require('../models/usuario')
const jwt = require('jsonwebtoken')
const { private_key, public_key } = keys

const errorResponse = (code, error) => {
    return {
        code,
        message: 'Error',
        printStackTrace: error
    }
}

const successResponseWithToken = (token, userId) => {
    return {
        code: 200,
        message: 'OK',
        token,
        data: userId
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

const authController = {
    login(req, res) {
        const { email, password } = req.body

        User.findOne({ email }, (error, user) => {
            if (error) return res.status(500).send(errorResponse(500, error))
            if (!user) return res.status(401).send(errorResponse(401, 'Invalid mail'))
            validateCredentials(user, password)
                .then(token => {
                    if (token) {
                        return res.status(200).send(successResponseWithToken(token, user._id))
                    } else {
                        return res.status(401).send(errorResponse(401, 'Invalid credentials'))
                    }
                })

        })
    },

    verifyAuthentication(req, res, next) {
        const token = req.headers.authorization
        try {
            if (!token) return res.status(403).send({
                authorized: false
            })
            jwt.verify(token, public_key, { algorithms: ['RS256'] }, (err, loggedUser) => {
                if (err) return res.status(401).send(errorResponseAuthorization(401, err))
                const { email, password } = loggedUser
                User.findOne({ email }, (error, user) => {
                    if (error) return res.status(500).send(errorResponseAuthorization(500, error))
                    if (user.password === password) {
                        next()
                    } else {
                        return res.status(401).send(errorResponseAuthorization(401, 'Unauthorized'))
                    }
                })
            })
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