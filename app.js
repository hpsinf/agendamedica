'use strict'

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const config = require('config');


//Middlewares 
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


// Permissões de headers
app.use((req, res, next) => {

    //Website que serão permitidos conectar a api
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request metodos aceitos
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');

    // Request headers aceitos
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, content-type, token');

    // true se precisar que o site inclua cookies na requisição recebida
    // (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', false);

    next();
});

//Middleware de aplicação
app.use((req, res, next) => {
    if (req.url === '/favicon.ico') {
        res.writeHead(200, { 'Content-Type': 'imgem/x-ico' })
    } else {
        next();
    }
});


//models
const user = require('./src/models/user'),
    paciente = require('./src/models/paciente'),
    clinica = require('./src/models/clinica'),
    especialidade = require('./src/models/especialidade'),
    profissional_especialista = require('./src/models/profissional_especialista'),
    profissional_clinico = require('./src/models/profissional_clinico'),
    agenda = require('./src/models/agenda'),
    consulta = require('./src/models/consulta'),
    historico = require('./src/models/historico');


//routers
app.use('/', require('./src/routes'));



module.exports = app;