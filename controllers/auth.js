const keys = require('../services/certificates');
const User = require('../models/usuario');
const jwt = require('jsonwebtoken');
const { private_key, public_key } = keys;

const authController = {
    login(req, res) {
        const { email, password } = req.body;
        User.findOne({ email }, (error, user) => {
            if(error) return res.status(500).send({
                message: "Error de login",
                detail: error.message
            });
            if(!user) return res.status(401).send({
                message: "No se encontró un usuario con ese email"
            });
            validateCredentials(user, password)
            .then(token => {
                if(token) {
                    return res.status(200).send({
                        token
                    })
                } else {
                    return res.status(401).send({
                        message: "Contraseña inválida"
                    });
                }
            })

        })
    },

    async verifyAuthentication(req, res) {
        const token = req.params.token;
        try {
            if(!token) return res.status(403).send({
                authorized: false
            })
            
            const loguedUser = await jwt.verify(token, public_key, { algorithms: ['RS256'] })
            const { email, password } = loguedUser;
            User.findOne({ email }, (error, user) => {
                if(error) return res.status(500).send({
                    message: "Error de verificación de usuario",
                    detail: error.message,
                    authorized: false
                });
                if(!user) return res.status(401).send({
                    message: "Token corrupto",
                    authorized: false
                });
                if (user.password === password) {
                    return res.status(200).send({
                        authorized: true
                    });
                } else {
                    return res.status(401).send({
                        message: "Token corrupto en informacion de contraseña de usuario",
                        authorized: false
                    });
                }
            })
        } catch (error) {
            console.error(error);
        }
    }
}

const validateCredentials = async (user, password) => {
    let token = null;
    const match = (password === user.password) ? "valid" : null;
    if (match) {
        token = jwt.sign(
            {
                "email": user.email,
                "password": user.password
            },
            private_key, { algorithm: 'RS256' }
        )
    } 
    return token;
}

module.exports = authController;