/* eslint-disable no-undef */

const mongoose = require('mongoose')
const Consulta = mongoose.model('consulta')


exports.get = async () => {
    const res = await Consulta.find({ status: 'Ativo' }, 'datahora_inicio datahora_final tipo_consulta observacao situacao data_criacao gestante lactante').
        populate('paciente').
        populate('agenda')
    return res
}


exports.getByIdPaciente = async (idPaciente) => {
    const res = await Consulta.find({ cliente: idPaciente }, 'datahora_inicio datahora_final tipo_consulta observacao situacao data_criacao gestante lactante').
        populate('paciente').
        populate('agenda')
    return res
}

exports.updatePatch = async (id, data) => {
    const res = await Consulta.findByIdAndUpdate(id, data)
    return res
}

exports.delete = async (id) => {
    const res = await Consulta.findByIdAndDelete(id)
    return res
}

exports.create = async (dados) => {
    let consulta = new Consulta(dados)
    return consulta.save()
}