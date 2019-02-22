'use strict'

const jwt = require('jsonwebtoken');
const config = require('config');
const key = config.get('Keys.readWrite');


exports.generateToken = async (data) => {
    return jwt.sign(data, key, { expiresIn: '1d' });
}


exports.verifiyToken = async (token) => {
    var data = await jwt.verify(token, key);
    return data;
}

exports.authorize = async (req, res, next) => {
    var token = req.body.token || req.query.token || req.headers['x-access-token', 'token'];
    if (!token) {
        res.status(401).json({
            message: 'Acesso Restrito'
        });
        return;
    }
    jwt.verify(token, key, (error, decoded) => {
        if (error) {
            res.status(401).json({
                message: 'Token Inválido'
            });
            return;
        }
        next();
    })
}
