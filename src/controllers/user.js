
const repo = require('../repositories/user')
const md5 = require('md5')
const config = require('config')
const key = config.get('Keys.readWrite')
const auth = require('../../services/auth')

const msgStateCode500 = 'Falha ao processar requisição!'
const msgStateCode200 = 'Operação efetuada com sucesso'
const msgNaoAutorizado = 'Não autorizado'



exports.getAll = async (req, res, next) => {
    try {
        var data = await repo.getAll()
        res.status(200).send(data)
    } catch (err) {
        res.status(500).send({
            mensagem: msgStateCode500, erro: err
        })
    }
}

exports.get = async (req, res, next) => {
    try {
        var data = await repo.getAll()
        res.status(200).send(data)
    } catch (err) {
        res.status(500).send({
            mensagem: msgStateCode500, erro: err
        });
    }
}

exports.post = async (req, res, next) => {
    let name = req.body.name || req.params.name;
    let email = req.body.email || req.params.email;
    let password = req.body.password || req.params.password;

    let dados = {
        name: name,
        email: email,
        password: md5(email + password + key)
    }

    try {
        await repo.create(dados);
        res.status(201).send({ mensagem: msgStateCode200, user: dados });
    } catch (err) {
        res.status(500).send({
            mensagem: msgStateCode500, data: err
        });
    }
}

exports.getAuth = async (req, res, next) => {

    var email = req.body.email || req.params.email || req.query.email;
    var password = req.body.password || req.params.password || req.query.password;

    try {
        var data = await repo.getAuth({
            email: email,
            password: md5(email + password + key)
        });

        if (!data) {
            return res.status(401).send({ message: msgNaoAutorizado})
            
        }

        const token = await auth.generateToken({ email: data.email })
        res.status(200).send({ token: token, user: data })

    } catch (err) {
        res.status(500).send({
            mensagem: msgStateCode500, erro: err
        })
    }
}

