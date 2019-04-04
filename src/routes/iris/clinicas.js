
const express = require('express');
const clinicaRoute = express.Router();
const controller = require('../../controllers/iris/clinica');
//const auth = require('../../../services/auth');

clinicaRoute.get('/', controller.get);
clinicaRoute.post('/cadastrar', controller.post);
clinicaRoute.post('/cadastrar/:nome', controller.post);

module.exports = clinicaRoute;
