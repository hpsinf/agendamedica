
const jwt = require('jsonwebtoken')
const config = require('../config/default.json')
const key = config.Keys.readWrite
const specialkey = config.Keys.specialKey

exports.generateToken = async (dados) => {
    return jwt.sign(dados, key, { expiresIn: dados.dias })
}

exports.verifiyToken = async (token) => {
    var data = await jwt.verify(token, key)
    return data;
}

exports.authorize = async (req, res, next) => {
    var token = req.body.token || req.query.token || req.headers['x-access-token', 'token']
    if (!token) {
        return res.status(401).json([{
            mensagem: config.Msg.acessoRestrito
        }])
    }
    jwt.verify(token, key, (error, decoded) => {
        if (error) {
            return res.status(401).json([{
                mensagem: config.Msg.tokenInvalido
            }])
        }
        next()
    })
}

exports.authorizeSpecial = async (req, res, next) => {
    var senha = req.body.senha || req.query.senha

    if (senha !== specialkey)
        return res.status(401).json([{
            mensagem: config.Msg.tokenInvalido
        }])
    next()
}

