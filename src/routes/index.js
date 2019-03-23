'use strict'

const express = require('express');
const router = express.Router();
const path = require('path');

//Rota raiz    
router.get('/', (req, res) => {
    res.status(200).sendFile('index.html', {root: path.join(__dirname, './')});
});

//Rotas
router.use('/users', require('./users'));
router.use('/pacientes', require('./pacientes'));
router.use('/clinicas', require('./clinicas'));
router.use('/especialidades', require('./especialidades'));
router.use('/profissionais_clinicos', require('./profissionais_clinicos'));
router.use('/profissionais_especialistas', require('./profissionais_especialistas'));
router.use('/agendas', require('./agendas'));


module.exports = router;