'use strict'

const express = require('express');
const pacienteRoute = express.Router();
const controller = require('../controllers/paciente');
const auth = require('../../services/auth');

pacienteRoute.get('/', controller.get);
pacienteRoute.get('/:nome', controller.getByNome);

pacienteRoute.post('/cadastrar', controller.post);
pacienteRoute.post('/cadastrar/:nome/:genero/:data_nascimento', controller.post);

pacienteRoute.patch('/', controller.patch);
pacienteRoute.patch('/:id', controller.patch);

pacienteRoute.delete('/', controller.delete);
pacienteRoute.delete('/:id', controller.delete);


module.exports = pacienteRoute;
