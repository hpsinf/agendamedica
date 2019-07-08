/* eslint-disable no-undef */

const mongoose = require('mongoose')
const Paciente = mongoose.model('paciente')


exports.getAll = async () => {
    const res = await Paciente.find({},'nome genero data_nascimento especial status observacao data_criacao')
    return res
}

exports.get = async () => {
    const res = await Paciente.find({ status: 'Ativo' }, 'nome genero data_nascimento especial status data_criacao observacao')
    return res
}

exports.getById = async (id) => {
    const res = await Paciente.findById(id, 'nome genero data_nascimento especial status data_criacao observacao')
    return res
}

exports.getByNome = async (nome) => {
    const res = await Paciente.find({nome: new RegExp('^'+nome, 'ig'), status : 'Ativo'}, 'nome genero data_nascimento especial status data_criacao observacao')
    return res
}

exports.updatePatch = async (id, data) => {
    const res = await Paciente.findByIdAndUpdate(id, data)
    return res
}

exports.delete = async (id) => {
    const res = await Paciente.findByIdAndDelete(id)
    return res
}

exports.create = (data) => {
    let paciente = new Paciente(data)
    return paciente.save()
}
