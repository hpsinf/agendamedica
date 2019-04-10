//Criação: Henrique 10/04/2019

const mongoose = require('mongoose')
const schema = mongoose.Schema


const model = new schema({
    nome: {
        type: String,
        required: true,
        trim: true
    },
    estado: {
        type: String,
        required: true,
        trim: true
    },
    data_criacao: {
        type: Date,
        required: true,
        default: Date.now
    },
    data_alteracao: {
        type: Date
    },
    data_exclusao: {
        type: Date
    },
    status: {
        type: String,
        required: true,
        enum: ['Ativo', 'Inativo', 'Pendente'],
        default: 'Ativo'
    }
})


module.exports = mongoose.model('cidade', model)
