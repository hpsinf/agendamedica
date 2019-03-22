'use strict'

const mongoose = require('mongoose');
const Clinica = mongoose.model('clinica');


exports.getAll = async () => {
    const res = await Clinica.find({},'nome status data_criacao');
    return res;
}

exports.get = async () => {
    const res = await Clinica.find({ status: 'Ativo' }, 'nome status data_criacao');
    return res;
}

exports.getById = async (id) => {
    const res = await Clinica.findById(id, 'nome status data_criacao');
    return res;
}

exports.getByNome = async (nome) => {
    const res = await Clinica.findOne(nome, 'nome status data_criacao');
    return res;
}

exports.update = async (data) => {
    const res = await Clinica.findByIdAndUpdate(id, data);
    return res;
}

exports.delete = async (data) => {
    const res = await Clinica.findByIdAndDelete(id, data);
    return res;
}

exports.create = (data) => {
    let clinica = new Clinica(data);
    return clinica.save();
}
