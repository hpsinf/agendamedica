'use strict'

const express = require('express');
const agendaRoute = express.Router();
const controller = require('../controllers/agenda');
const auth = require('../../services/auth');

agendaRoute.get('/', controller.get);
agendaRoute.post('/cadastrar', controller.post);

module.exports = agendaRoute;
