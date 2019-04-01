'use strict'

const mongoose = require('mongoose')
const config = require('../config/default.json')

mongoose.set('useFindAndModify', false)
mongoose.set('useCreateIndex', true)

let initConnectString = config.Connect.MongoDB.mongoDbAtlas.initConnectString
let user = config.Connect.MongoDB.mongoDbAtlas.user
let password = config.Connect.MongoDB.mongoDbAtlas.password
let dominio = config.Connect.MongoDB.mongoDbAtlas.dominio
let dataBaseName = config.Connect.MongoDB.mongoDbAtlas.databasename
let name = config.Connect.MongoDB.mongoDbAtlas.name

const connectString = initConnectString + user + ':' + password + '@' + dominio + '/' + dataBaseName
mongoose.connect(connectString, { useNewUrlParser: true })
const db = mongoose.connection


db.on('error', err => {
    console.log(err)
});

db.once('open', () => {
    console.log('Conectado ao ' + name)
});
module.exports = mongoose