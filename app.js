
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const config = require('config')


//Middlewares 
//app.use(bodyParser.text())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))


// Permissões de headers
app.use((req, res, next) => {

    //Website que serão permitidos conectar a api
    res.setHeader('Access-Control-Allow-Origin', '*')

    // Request metodos aceitos
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE')

    // Request headers aceitos
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, content-type, token')

    // true se precisar que o site inclua cookies na requisição recebida
    // (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', false)

    next()
});

//Middleware de aplicação
app.use((req, res, next) => {
    if (req.url === '/favicon.ico') {
        res.writeHead(200, { 'Content-Type': 'imgem/x-ico' })
    } else {
        next()
    }
});


//Instanciar models
//Raiz rotas gerais
const user = require('./src/models/user')

//Models Clientes
const paciente_iris = require('./src/models/iris/paciente'),
    clinica_iris = require('./src/models/iris/clinica'),
    especialidade_iris = require('./src/models/iris/especialidade'),
    profissional_especialista_iris = require('./src/models/iris/profissional_especialista'),
    profissional_clinico_iris = require('./src/models/iris/profissional_clinico'),
    agenda_iris = require('./src/models/iris/agenda'),
    consulta_iris = require('./src/models/iris/consulta'),
    historico_iris = require('./src/models/iris/historico')
    
//Rotas
//Raiz Gerencial
app.use('/', require('./src/routes')) 

//Rotas Clientes
app.use('/iris', require('./src/routes/iris'))


module.exports = app