/* eslint-disable no-undef */


const express = require('express')
const consultaRoute = express.Router()
const controller = require('../controllers/consulta')
//const auth = require('../../services/auth')

consultaRoute.get('/', controller.get)
consultaRoute.post('/cadastrar', controller.post)
consultaRoute.delete('/', controller.delete)
consultaRoute.patch('/', controller.updatePacth)

module.exports = consultaRoute;
