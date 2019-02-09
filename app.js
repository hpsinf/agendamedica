'use strict'

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const config = require('config');


//Middlewares 
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


// Permissões de headers
app.use((req, res, next) =>{

    //Website que serão permitidos conectar a api
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, content-type, token');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
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
//const models = require('./src/models/modelo');


//routers
app.use('/', require('./src/routes'));



module.exports = app;