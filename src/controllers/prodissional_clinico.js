'use strict'

const repo = require('../repositories/profissional_clinico');

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
    let nome = req.body.nome || req.params.nome || req.query.nome;

    let dados = {
        nome: nome
    }

    try {
        await repo.create(dados);
        res.status(201).send({ messege: 'Cadastrado efetuado!', profissional_clinico: dados });
    } catch (err) {
        res.status(500).send({
            messege: 'Falha ao cadastrar Paciente!', data: err
        });
    }
}