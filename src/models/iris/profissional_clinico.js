'use strict'

const mongoose = require('mongoose');
const schema = mongoose.Schema;

const model = new schema({
    nome: {
        type: String,
        required: true,
        trim: true
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
    }
});

module.exports = mongoose.model('profissional_clinico', model);