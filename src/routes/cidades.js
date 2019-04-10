
//Criação: Henrique 10/04/2019

const express = require('express')
const cidadeRoute = express.Router()
const controller = require('../controllers/cidade')


cidadeRoute.get('/', controller.get)
cidadeRoute.get('/:estado', controller.getByEstado)

cidadeRoute.post('/', controller.post);
cidadeRoute.post('/:nome/:estado/cadastrar', controller.post);

cidadeRoute.delete('/:id', controller.delete);
cidadeRoute.delete('/:id', controller.delete);

cidadeRoute.patch('/', controller.patch);
cidadeRoute.patch('/:id', controller.patch);

module.exports = cidadeRoute
