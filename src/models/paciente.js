'use strict'

const mongoose = require('mongoose');
const schema = mongoose.Schema;

const model = new schema({
    nome: {
        type: String,
        required: true,
        trim: true
    },
    genero: {
        type: String,
        required: true,
        enum: ['Masculino', 'Feminino']
    },
    data_nascimento: {
        type: Date,
        required: true
    },
    especial: {
        type: String,
        required: true,
        enum: ['Sim', 'Nao'],
        default: 'Nao'
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
    observacao: {
        type: String               
    }
});

module.exports = mongoose.model('paciente', model);