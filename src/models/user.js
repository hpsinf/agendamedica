const mongoose = require('mongoose')
const schema = mongoose.Schema


const model = new schema({
    nome: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        trim: true
    },
    status: {
        type: String,
        required: true,
        enum: ['Ativo', 'Inativo', 'Pendente'],
        default: 'Ativo'
    },
    data_criacao: {
        type: Date,
        required: true,
        default: Date.now
    }
})

module.exports = mongoose.model('user', model)
