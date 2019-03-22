'use strict'

const express = require('express');
const pacienteRoute = express.Router();
const controller = require('../controllers/paciente');
const auth = require('../../services/auth');

pacienteRoute.get('/', controller.get);
pacienteRoute.post('/cadastrar', controller.post);
pacienteRoute.post('/cadastrar/:nome/:genero/:data_nascimento', controller.post);

module.exports = pacienteRoute;
