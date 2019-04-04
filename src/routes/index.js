/* eslint-disable no-undef */

const express = require('express')
const router = express.Router()
const path = require('path')

//Rota raiz    
router.get('/', (req, res) => {
    res.status(200).sendFile('index.html', {root: path.join(__dirname, './')})
});

//Rotas gerenciais
router.use('/users', require('./users'))

module.exports = router