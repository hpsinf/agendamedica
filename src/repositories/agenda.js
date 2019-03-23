'use strict'

const mongoose = require('mongoose');
const Agenda = mongoose.model('agenda');


exports.getAll = async () => {
    const res = await Agenda.find({}, 'datahora_agendamento datahora_comparecimento status observacao data_criacao').
        populate('paciente').
        populate('clinica').
        populate('profissional_especialista').
        populate('profissional_clinico').
        populate('especialidade')
    return res;
}

exports.get = async () => {
    const res = await Agenda.find({ status: 'Agendado' }, 'datahora_agendamento datahora_comparecimento status observacao data_criacao').
        populate('paciente').
        populate('clinica').
        populate('profissional_especialista').
        populate('profissional_clinico').
        populate('especialidade')
    return res;
}

exports.getById = async (id) => {
    const res = await Agenda.findById(id, 'datahora_agendamento datahora_comparecimento status observacao data_criacao');
    return res;
}

exports.getByIdPaciente = async (idpaciente) => {
    const res = await Agenda.find({ paciente: idpaciente }, 'datahora_agendamento datahora_comparecimento status observacao data_criacao').
        populate('paciente').
        populate('clinica').
        populate('profissional_especialista').
        populate('profissional_clinico').
        populate('especialidade')
    return res;
}

exports.update = async (data) => {
    const res = await Agenda.findByIdAndUpdate(id, data);
    return res;
}

exports.delete = async (data) => {
    const res = await Agenda.findByIdAndDelete(id, data);
    return res;
}

exports.create = (data) => {
    let agenda = new Agenda(data);
    return agenda.save();
}
