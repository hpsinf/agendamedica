'use strict'

const mongoose = require('mongoose');
const schema = mongoose.Schema;

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
        required: true,
        enum: ['Presencial', 'Remota'],
        default: 'Remota'
    },
    observacao: {
        type: String,
        trim: true
    },
    status: {
        type: String,
        required: true,
        enum: ['Agendado', 'Reagendado', 'Atendido', 'Cancelado'],
        default: 'Agendado'
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
    clinica: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'clinica',
        required: true
    },
    profissional_especialista: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'profissional_especialista',
        required: true
    },
    profissional_clinico: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'profissional_clinico',
        required: true
    },
    especialidade: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'especialidade',
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
});

module.exports = mongoose.model('consulta', model);


