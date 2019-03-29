'use strict'


const repo = require('../repositories/paciente');
const moment = require('moment');

let cachePacientes = {};

exports.getAll = async (req, res, next) => {
    try {
        if (cachePacientes.length !== undefined) {
            res.status(204).send(cachePacientes);
        } else {
            var data = await repo.getAll();
            cachePacientes = data;
            res.status(200).send(data);
            setTimeout(() => {
                cachePacientes = {};
            }, 90000);
        }
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

exports.getByNome = async (req, res, next) => {
    let nome = req.body.nome || req.params.nome || req.query.nome;
    if (nome) {
        try {
            var data = await repo.getByNome(nome);
            if (data.length !== 0)
                res.status(200).send(data);
            else
                res.status(200).send({ mensagem: 'Nome de paciente não encontrado na base de dados' });
        } catch (e) {
            res.status(500).send({
                mensagem: 'Falha ao processar requisição!'
            });
        }
    } else {
        res.status(204).send({
            mensagem: 'Nome não encontrado na requisição para efetuar uma consulta'
        });
    }
}
exports.post = async (req, res, next) => {
    let nome = req.body.nome || req.params.nome || req.query.nome;
    let genero = req.body.genero || req.params.genero || req.query.genero;
    let data_nascimento = moment(req.body.data_nascimento || req.params.data_nascimento || req.query.data_nascimento, 'DD-MM-YYYY').format();
    let especial = req.body.especial || req.params.especial || req.query.especial;
    let observacao = req.body.observacao || req.params.observacao || req.query.observacao;

    let dados = {
        nome: nome,
        genero: genero,
        data_nascimento: data_nascimento,
        especial: especial,
        observacao: observacao
    }

    try {
        await repo.create(dados);
        res.status(201).send({ mensagem: 'Cadastrado efetuado!', paciente: dados });
    } catch (err) {
        res.status(500).send({
            mensagem: 'Falha ao cadastrar Paciente!', data: err
        });
    }
}

exports.patch = async (req, res, next) => {
    let id = req.body.id || req.params.id || req.query.id;
    let body = req.body;
    if (id && body) {
        try {
            await repo.updatePatch(id, body)
            res.status(200).send('Alterado com sucesso');
        } catch (err) {
            res.status(500).send({
                mensagem: 'Falha ao Atualizar!', data: err
            });
        }
    } else {
        res.status(204).send({
            mensagem: 'ID e Body não encontrado na requisição para efetuar a operação'
        });
    }
}

exports.delete = async (req, res, next) => {
    let id = req.body.id || req.params.id || req.query.id;
    if (id) {
        try {
            await repo.delete(id)
            res.status(200).send('Excluido com sucesso');
        } catch (err) {
            res.status(500).send({
                mensagem: 'Falha ao excluir!', data: err
            });
        }
    } else {
        res.status(204).send({
            mensagem: 'ID não encontrado na requisição para efetuar a operação'
        });
    }
}
