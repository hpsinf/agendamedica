//Criação: Henrique 10/04/2019

const mongoose = require('mongoose')
const Cidade = mongoose.model('cidade')


exports.getAll = async () => {
    const res = await Cidade.find({}, 'nome estado status data_criacao data_alteracao data_exclusao')
    return res
}

exports.get = async () => {
    const res = await Cidade.find({ status: 'Ativo' }, 'nome estado data_criacao data_alteracao data_exclusao')
    return res
}

exports.getByEstado = async (estado) => {
    const res = await Cidade.find({ estado: estado }, 'nome status data_criacao data_alteracao data_exclusao')
    return res
}

exports.create = (data) => {
    let cidade = new Cidade(data)
    return cidade.save()
}

exports.updatePatch = async (id, data) => {
    const res = await Cidade.findByIdAndUpdate(id, data)
    return res
}

exports.delete = async (id) => {
    const res = await Cidade.findByIdAndDelete(id)
    return res
}

