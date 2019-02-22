'use strict'

const mongoose = require('mongoose');
const config = require('config');

mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);

let initConnectString = config.get('Connect.MongoDB.mongoDbAtlas.initConnectString');
let user = config.get('Connect.MongoDB.mongoDbAtlas.user');
let password = config.get('Connect.MongoDB.mongoDbAtlas.password');
let dominio = config.get('Connect.MongoDB.mongoDbAtlas.dominio');
let dataBaseName = config.get('Connect.MongoDB.mongoDbAtlas.databasename');
let name = config.get('Connect.MongoDB.mongoDbAtlas.name');

//const connectString = 'mongodb://' + config.db.user + ':' + config.db.password + '@' + config.db.server + ':' + config.db.port + '/' + config.db.dataBaseName;
const connectString = initConnectString + user + ':' + password + '@' + dominio + '/' + dataBaseName;
//console.log(connectString);     
mongoose.connect(connectString, { useNewUrlParser: true });
const db = mongoose.connection;


db.on('error', err => {
    console.log(err);    
});

db.once('open', () => {
    console.log('Conectado ao '+ name);
});
module.exports = mongoose;