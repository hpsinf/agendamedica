/* eslint-disable no-undef */

const mongoose = require('mongoose')
const schema = mongoose.Schema

const model = new schema({
    datahora_inicio: {
        type: Date,
        required: true
    },
    datahora_final: {
        type: Date
    },
    tipo_consulta: {
        type: String,
        enum: ['Presencial', 'Remota'],         
    },
    observacao: {
        type: String,
        trim: true
    },
    situacao: {
        type: String,
        required: true,
        enum: ['Atendida', 'Em Atendimento', 'Cancelada'],
        default: 'Em Atendimento'
    },
    status: {
        type: String,
        required: true,
        enum: ['Ativo', 'Inativo'],
        default: 'Ativo'
    },
    data_criacao: {
        type: Date,
        required: true,
        default: Date.now
    },
    paciente: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'paciente',
        required: true
    },      
    agenda: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'agenda',
        required: true
    },
    gestante: {
        type: String,
        enum: ['Sim', 'Nao']
    },
    lactante: {
        type: String,
        enum: ['Sim', 'Nao']
    }
})

module.exports = mongoose.model('consulta', model)


