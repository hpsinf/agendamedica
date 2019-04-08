
const mongoose = require('mongoose')
const User = mongoose.model('user')


exports.getAll = async () => {
    const res = await User.find({}, 'nome email status data_criacao')
    return res
}

exports.get = async () => {
    const res = await User.find({ status: 'Ativo' }, 'nome email data_criacao')
    return res
}

exports.getAutenticacao = async (data) => {
    const res = await User.findOne({ nome: data.nome, senha: data.senha }, 'nome email status')
    return res
}

exports.create = (data) => {
    let user = new User(data)
    return user.save()
}
