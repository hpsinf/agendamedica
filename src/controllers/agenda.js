'use strict'


const repo = require('../repositories/agenda');
const moment = require('moment');

moment.locale('pt-BR');



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

exports.getById = async (req, res, next) => {
    let idAgenda = req.params.idagenda || req.body.idagenda;
    try {
        var data = await repo.getById(idAgenda);
        res.status(200).send(data);
    } catch (e) {
        res.status(500).send({
            messege: 'Falha ao processar requisição!'
        });
    }
}

exports.getByIdPaciente = async (req, res, next) => {
    let idpaciente = req.params.idpaciente || req.body.idpaciente;
    try {
        if (idpaciente) {
            var data = await repo.getByIdPaciente(idpaciente);
            res.status(200).send(data);
        }
        else {
            res.status(204).send({
                messege: 'idpaciente vazio!'
            });
        }
    } catch (e) {
        res.status(500).send({
            messege: 'Falha ao processar requisição!'
        });
    }
}

exports.post = async (req, res, next) => {
    const datahora_agendamento =
        moment.utc(req.body.datahora_agendamento || req.params.datahora_agendamento || req.query.datahora_agendamento, 'DD-MM-YYYY HH:mm').format();
    
    const observacao = req.body.observacao || req.params.observacao || req.query.observacao;
    const idpaciente = req.body.idpaciente || req.params.idpaciente || req.query.idpaciente;
    const idclinica = req.body.idclinica || req.params.idclinica || req.query.idclinica;
    const idprofissional_clinico = req.body.idprofissional_clinico || req.params.idprofissional_clinico || req.query.idprofissional_clinico;
    const idprofissional_especialista = req.body.idprofissional_especialista || req.params.idprofissional_especialista || req.query.idprofissional_especialista;
    const idespecialidade = req.body.idespecialidade || req.params.idespecialidade || req.query.idespecialidade;

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
        await repo.create(dados);
        res.status(201).send({ messege: 'Cadastrado efetuado!', agenda: dados });
    } catch (err) {
        res.status(500).send({
            messege: 'Falha ao cadastrar Paciente!', data: err
        });
    }
}