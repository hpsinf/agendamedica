'use strict'

const mongoose = require('mongoose');
const Especialista = mongoose.model('profissional_especialista');


exports.getAll = async () => {
    const res = await Especialista.find({},'nome status data_criacao');
    return res;
}

exports.get = async () => {
    const res = await Especialista.find({ status: 'Ativo' }, 'nome status data_criacao');
    return res;
}

exports.getById = async (id) => {
    const res = await Especialista.findById(id, 'nome status data_criacao');
    return res;
}

exports.getByNome = async (nome) => {
    const res = await Especialista.findOne(nome, 'nome status data_criacao');
    return res;
}

exports.update = async (data) => {
    const res = await Especialista.findByIdAndUpdate(id, data);
    return res;
}

exports.delete = async (data) => {
    const res = await Especialista.findByIdAndDelete(id, data);
    return res;
}

exports.create = (data) => {
    let especialista = new Especialista(data);
    return especialista.save();
}
