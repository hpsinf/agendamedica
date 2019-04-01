/* eslint-disable no-undef */

const express = require('express')
const agendaRoute = express.Router()
const controller = require('../controllers/agenda')
//const auth = require('../../services/auth')

agendaRoute.get('/', controller.get)
agendaRoute.get('/:idpaciente', controller.getByIdPaciente)
agendaRoute.post('/cadastrar', controller.post)
agendaRoute.delete('/', controller.delete)

module.exports = agendaRoute;
