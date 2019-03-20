'use strict'

const mongoose = require('mongoose');
const schema = mongoose.Schema;

const model = new schema({
    datahora: {
        type: Date,
        required: true,
        default: Date.now
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
    consulta: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'consulta',        
    },
    historico: {
        type: String,
        trim: true
    },
    tipo: {
        type: String,
        required: true,
        enum: ['Protuario', 'Receita', 'Resultado', 'Exame', 'Laudo']        
    }
});

module.exports = mongoose.model('consulta', model);
