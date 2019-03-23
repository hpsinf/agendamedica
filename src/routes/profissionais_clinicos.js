'use strict'

const express = require('express');
const profissional_clinico = express.Router();
const controller = require('../controllers/prodissional_clinico');
const auth = require('../../services/auth');

profissional_clinico.get('/', controller.get);
profissional_clinico.post('/cadastrar', controller.post);
profissional_clinico.post('/cadastrar/:nome', controller.post);

module.exports = profissional_clinico;
