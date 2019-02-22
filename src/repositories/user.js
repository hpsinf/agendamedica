'use strict'

const mongoose = require('mongoose');
const User = mongoose.model('user');


exports.getAll = async () => {
    const res = await User.find({},'name email password createdate');
    return res;
}

exports.get = async () => {
    const res = await User.find({ status: 'Ativo' }, 'name email password createdate');
    return res;
}

exports.getAuth = async (data) => {
    const res = await User.findOne({ email: data.email, password: data.password }, 'name email status');
    return res;
}

exports.create = (data) => {
    let user = new User(data);
    return user.save();
}
