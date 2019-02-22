'use strict'

const mongoose = require('mongoose');
const schema = mongoose.Schema;


const model = new schema({
    name: {
        type: String,
        required: true,
        trim: true
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
    createdate: {
        type: Date,
        required: true,
        default: Date.now
    }

});

module.exports = mongoose.model('user', model);
