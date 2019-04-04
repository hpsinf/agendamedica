'use strict'

const mongoose = require('mongoose');
const Especialidade = mongoose.model('especialidade');


exports.getAll = async () => {
    const res = await Especialidade.find({},'nome status data_criacao');
    return res;
}

exports.get = async () => {
    const res = await Especialidade.find({ status: 'Ativo' }, 'nome status data_criacao');
    return res;
}

exports.getById = async (id) => {
    const res = await Especialidade.findById(id, 'nome status data_criacao');
    return res;
}

exports.getByNome = async (nome) => {
    const res = await Especialidade.findOne(nome, 'nome status data_criacao');
    return res;
}

exports.update = async (data) => {
    const res = await Especialidade.findByIdAndUpdate(id, data);
    return res;
}

exports.delete = async (data) => {
    const res = await Especialidade.findByIdAndDelete(id, data);
    return res;
}

exports.create = (data) => {
    let especialidade = new Especialidade(data);
    return especialidade.save();
}
