/* eslint-disable no-undef */
'use strict'


const repo = require('../../repositories/iris/agenda')
const moment = require('moment')
const config = require('../../../config/default.json')
moment.locale('pt-BR')

let cacheAgenda = {}

exports.getAll = async (req, res) => {
    try {
        if (cacheAgenda.length !== undefined) {
            res.status(200).send(cacheAgenda)
        } else {
            var data = await repo.getAll()
            cacheAgenda = data;
            res.status(200).send(data)
            setTimeout(() => {
                cacheAgenda = {}
            }, 900000);
        }
    } catch (err) {
        res.status(500).send([{
            mensagem: config.Msg.statusCode500, erro: err
        }]);
    }
}

exports.get = async (req, res) => {
    try {
        var data = await repo.getAll()
        res.status(200).send(data)
    } catch (err) {
        res.status(500).send([{
            mensagem: config.Msg.statusCode500, erro: err
        }])
    }
}

exports.getById = async (req, res) => {
    let idAgenda = req.params.idagenda || req.body.idagenda || req.query.idagenda
    try {
        var data = await repo.getById(idAgenda)
        res.status(200).send(data)
    } catch (err) {
        res.status(500).send({
            mensagem: config.Msg.statusCode500, erro: err
        });
    }
}

exports.getByIdPaciente = async (req, res) => {
    let idpaciente = req.params.idpaciente || req.body.idpaciente || req.query.idpaciente
    try {
        if (idpaciente) {
            var data = await repo.getByIdPaciente(idpaciente)
            res.status(200).send(data)
        }
        else {
            res.status(204).send([{
                mensagem: config.Msg.idPacienteVazia
            }])
        }
    } catch (err) {
        res.status(500).send([{
            mensagem: config.Msg.statusCode500, erro: err
        }])
    }
}

exports.post = async (req, res) => {
    const datahora_agendamento =
        moment.utc(req.body.datahora_agendamento || req.params.datahora_agendamento || req.query.datahora_agendamento, 'DD-MM-YYYY HH:mm').format()

    const observacao = req.body.observacao || req.params.observacao || req.query.observacao
    const idpaciente = req.body.idpaciente || req.params.idpaciente || req.query.idpaciente
    const idclinica = req.body.idclinica || req.params.idclinica || req.query.idclinica
    const idprofissional_clinico = req.body.idprofissional_clinico || req.params.idprofissional_clinico || req.query.idprofissional_clinico
    const idprofissional_especialista = req.body.idprofissional_especialista || req.params.idprofissional_especialista || req.query.idprofissional_especialista
    const idespecialidade = req.body.idespecialidade || req.params.idespecialidade || req.query.idespecialidade

    let dados = {
        datahora_agendamento: datahora_agendamento,
        paciente: idpaciente,
        clinica: idclinica,
        observacao: observacao,
        profissional_clinico: idprofissional_clinico,
        profissional_especialista: idprofissional_especialista,
        especialidade: idespecialidade
    }

    try {
        await repo.create(dados)
        res.status(201).send([{ mensagem: config.Msg.statusCode200, agenda: dados }])
    } catch (err) {
        res.status(500).send([{
            mensagem: config.Msg.statusCode500, erro: err
        }])
    }
}

exports.delete = async (req, res) => {
    let idAgenda = req.params.idagenda || req.body.idagenda || req.query.idagenda
    try {
        var data = await repo.delete(idAgenda)
        res.status(200).send(data)
    } catch (e) {
        res.status(500).send([{
            mensagem: config.Msg.statusCode500
        }]);
    }
}