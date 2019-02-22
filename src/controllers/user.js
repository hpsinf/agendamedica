'use strict'

const repo = require('../repositories/user');
const md5 = require('md5');
const config = require('config');
const key = config.get('Keys.readWrite');
const auth = require('../../services/auth');



exports.getAll = async (req, res, next) => {
    try {
        var data = await repo.getAll();
        res.status(200).send(data);
    } catch (e) {
        res.status(500).send({
            messege: 'Falha ao processar requisição!'
        });
    }
}

exports.get = async (req, res, next) => {
    try {
        var data = await repo.getAll();
        res.status(200).send(data);
    } catch (e) {
        res.status(500).send({
            messege: 'Falha ao processar requisição!'
        });
    }
}

exports.post = async (req, res, next) => {
    let name = req.body.name || req.params.name;
    let email = req.body.email || req.params.email;
    let password = req.body.password || req.params.password;

    let dados = {
        name: name,
        email: email,
        password: md5(email + password + key)
    }

    try {
        await repo.create(dados);
        res.status(201).send({ messege: 'Cadastrado efetuado!', user: dados });
    } catch (err) {
        res.status(500).send({
            messege: 'Falha ao cadastrar Cliente!', data: err
        });
    }
}

exports.getAuth = async (req, res, next) => {
    
    var email = req.body.email || req.params.email || req.query.email;
    var password = req.body.password || req.params.password || req.query.password;

     try {
        var data = await repo.getAuth({
            email: email,
            password: md5(email + password + key )
        });
        
        if (!data) {
            res.status(401).send({message: 'Não autorizado'});    
            return;
        }

        const token = await auth.generateToken({email: data.email});
        res.status(200).send({token: token, user: data});
        
    } catch (err) {
        res.status(500).send({
            messege: 'Falha ao processar requisição!', erro: err
        });
    }
}

