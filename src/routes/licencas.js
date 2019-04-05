

const express = require('express')
const licencaRoute = express.Router()
const controller = require('../controllers/licenca')
const auth = require('../../services/auth')

licencaRoute.get('/gerar', auth.authorizeSpecial, controller.getLicenca)
licencaRoute.get('/verificar', auth.authorizeSpecial, controller.getVerificar)

module.exports = licencaRoute
