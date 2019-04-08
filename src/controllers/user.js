
const repo = require('../repositories/user')
const md5 = require('md5')
const config = require('../../config/default.json')
const key = config.Keys.usuario
const globaluse = require('../../globaluse/functions')

exports.getAll = async (req, res, next) => {
    try {
        var data = await repo.getAll()
        res.status(200).send(data)
    } catch (err) {
        res.status(500).send([{
            mensagem: config.Msg.statusCode500, erro: err
        }])
    }
}

exports.get = async (req, res, next) => {
    try {
        var data = await repo.getAll()
        res.status(200).send(data)
    } catch (err) {
        res.status(500).send([{
            mensagem: config.Msg.statusCode500, erro: err
        }])
    }
}

exports.post = async (req, res, next) => {
    let nome = req.body.nome || req.params.nome || req.query.nome
    let email = req.body.email || req.params.email || req.query.email
    let senha = req.body.senha || req.params.senha || req.query.senha

    let dados = {
        nome: nome,
        email: email,
        senha: md5(nome + senha + key)
    }

    
    try {
        await repo.create(dados)
        res.status(201).send([{ mensagem: config.Msg.statusCode200, user: dados }])
    } catch (err) {
        res.status(500).send([{
            mensagem: config.Msg.statusCode500, data: err
        }])
    }
}

exports.getAutenticacao = async (req, res, next) => {

    var nome = req.body.nome || req.params.nome || req.query.nome
    var senha = req.body.senha || req.params.senha || req.query.senha
    //const d = globaluse.pluck(req.body, 'nome', 'senha')
    //console.log(d)

    try {
        var data = await repo.getAutenticacao({
            nome: nome,
            senha: md5(nome + senha + key)
        });

        if (!data) {
            return res.status(401).send([{ mensagem: config.Msg.naoAutorizado }])

        }
        res.status(200).send([{ status: data.status }])    

    } catch (err) {
        res.status(500).send([{
            mensagem: config.Msg.statusCode500, erro: err
        }])
    }
}

