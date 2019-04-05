
const mongoose = require('mongoose')
const User = mongoose.model('user')


exports.getAll = async () => {
    const res = await User.find({},'nome email password data_criacao')
    return res
}

exports.get = async () => {
    const res = await User.find({ status: 'Ativo' }, 'nome email password data_criacao')
    return res
}

exports.getAutenticacao = async (data) => {
    const res = await User.findOne({ email: data.email, password: data.password, nome: data.nome }, 'nome email status')
    return res
}

exports.create = (data) => {
    let user = new User(data)
    return user.save()
}
