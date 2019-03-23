'use strict'

const express = require('express');
const especialidadeRoute = express.Router();
const controller = require('../controllers/especialidade');
const auth = require('../../services/auth');

especialidadeRoute.get('/', controller.get);
especialidadeRoute.post('/cadastrar', controller.post);
especialidadeRoute.post('/cadastrar/:nome', controller.post);

module.exports = especialidadeRoute;
