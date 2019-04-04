'use strict'

const express = require('express');
const profissional_especialista = express.Router();
const controller = require('../../controllers/iris/profissional_especialista');
//const auth = require('../../../services/auth');

profissional_especialista.get('/', controller.get);
profissional_especialista.post('/cadastrar', controller.post);
profissional_especialista.post('/cadastrar/:nome', controller.post);

module.exports = profissional_especialista;
