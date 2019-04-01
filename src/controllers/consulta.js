/* eslint-disable no-undef */

const repo = require('../repositories/consulta')
const moment = require('moment')
const config = require('../../config/default.json')
moment.locale('pt-BR')

let cacheConsulta = {}

exports.getAll = async (req, res) => {
    try {
        if (cacheConsulta.length !== undefined) {
            res.status(200).send(cacheConsulta)
        } else {
            var data = await repo.getAll()
            cacheConsulta = data;
            res.status(200).send(data)
            setTimeout(() => {
                cacheConsulta = {}
            }, 3000);
        }
    } catch (err) {
        res.status(500).send([{
            mensagem: config.Msg.statusCode500, erro: err
        }]);
    }
}

exports.get = async (req, res) => {
    try {
        var data = await repo.get()
        res.status(200).send(data)
    } catch (err) {
        res.status(500).send([{
            mensagem: config.Msg.statusCode500, erro: err
        }])
    }
}

exports.getById = async (req, res) => {
    let idConsulta = req.params.idconsulta || req.body.idconsulta || req.query.idconsulta
    try {
        var data = await repo.getById(idConsulta)
        res.status(200).send(data)
    } catch (err) {
        res.status(500).send({
            mensagem: config.Msg.statusCode500, erro: err
        })
    }
}

exports.getByIdPaciente = async (req, res) => {
    let idpaciente = req.params.idpaciente || req.body.idpaciente || req.query.idpaciente
    try {
        if (idpaciente) {
            var data = await repo.getByIdPaciente(idpaciente)
            res.status(200).send(data);
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
    const datahora_Inicio =
        moment.utc(req.body.datahora_inicio || req.params.datahora_inicio || req.query.datahora_inicio, 'DD-MM-YYYY HH:mm').format()

    const observacao = req.body.observacao || req.params.observacao || req.query.observacao
    const idPaciente = req.body.idpaciente || req.params.idpaciente || req.query.idpaciente
    const idAgenda = req.body.idagenda || req.params.idagenda || req.query.idagenda



    let dados = {
        datahora_inicio: datahora_Inicio,
        paciente: idPaciente,
        agenda: idAgenda,
        observacao: observacao
    }

    try {
        await repo.create(dados)
        res.status(201).send([{ mensagem: config.Msg.statusCode200, consulta: dados }])
    } catch (err) {
        res.status(500).send([{
            mensagem: config.Msg.statusCode500, erro: err
        }])
    }
}

exports.delete = async (req, res) => {
    let idConsulta = req.params.idconsulta || req.body.idconsulta || req.query.idconsulta
    try {
        var data = await repo.updatePatch(idConsulta, {status: 'Inativo'})
        res.status(200).send(data)
    } catch (err) {
        res.status(500).send([{
            mensagem: config.Msg.statusCode500, erro: err
        }])
    }
}

exports.updatePacth = async (req, res) => {
    let idConsulta = req.params.idconsulta || req.body.idconsulta || req.query.idconsulta
    let dados = req.body
    try {
        var data = await repo.updatePatch(idConsulta, dados)
        res.status(200).send([{ mensagem: config.Msg.statusCode200, consulta: data }])
    } catch (err) {
        res.status(500).send([{
            mensagem: config.Msg.statusCode500, erro: err
        }])
    }
}