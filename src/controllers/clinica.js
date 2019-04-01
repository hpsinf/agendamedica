/* eslint-disable no-undef */

const repo = require('../repositories/clinica');

exports.getAll = async (req, res, next) => {
    try {
        var data = await repo.getAll();
        res.status(200).send(data);
    } catch (e) {
        res.status(500).send({
            mensagem: 'Falha ao processar requisição!'
        });
    }
}

exports.get = async (req, res, next) => {
    try {
        var data = await repo.getAll();
        res.status(200).send(data);
    } catch (e) {
        res.status(500).send({
            mensagem: 'Falha ao processar requisição!'
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
        res.status(201).send({ mensagem: 'Cadastrado efetuado!', clinica: dados });
    } catch (err) {
        res.status(500).send({
            mensagem: 'Falha ao cadastrar Paciente!', data: err
        });
    }
}