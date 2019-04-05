
const express = require('express')
const userRoute = express.Router()
const controller = require('../controllers/user')
const auth = require('../../services/auth')

userRoute.get('/', auth.authorize, controller.get)
userRoute.get('/:nome/:senha/autenticacao', controller.getAutenticacao)
userRoute.post('/:nome/:email/:senha/cadastrar', controller.post);

module.exports = userRoute
