'use strict'


const repo = require('../repositories/paciente');
const moment = require('moment');


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
    let nome = req.body.nome || req.params.nome;
    let genero = req.body.genero || req.params.genero;
    let data_nascimento = moment(req.body.data_nascimento || req.params.data_nascimento, 'DD-MM-YYYY').format();
    let especial = req.body.especial || req.params.especial;
    let observacao = req.body.observacao || req.params.observacao;    

    let dados = {
        nome: nome,
        genero: genero,
        data_nascimento: data_nascimento,
        especial: especial,
        observacao: observacao
    }

    try {
        await repo.create(dados);
        res.status(201).send({ messege: 'Cadastrado efetuado!', paciente: dados });
    } catch (err) {
        res.status(500).send({
            messege: 'Falha ao cadastrar Paciente!', data: err
        });
    }
}