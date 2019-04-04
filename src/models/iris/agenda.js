/* eslint-disable no-undef */

const mongoose = require('mongoose');
const schema = mongoose.Schema;

const model = new schema({
    datahora_agendamento: {
        type: Date,
        required: true
    },
    datahora_comparecimento: {
        type: Date
    },
    observacao: {
        type: String,
        trim: true
    },
    status: {
        type: String,
        required: true,
        enum: ['Ativo', 'Inativo'],
        default: 'Ativo'
    },
    situacao: {
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
    }
});

module.exports = mongoose.model('agenda', model);


