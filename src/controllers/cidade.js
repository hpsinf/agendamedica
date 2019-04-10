//Criação: Henrique 10/04/2019

const repo = require('../repositories/cidade')
const config = require('../../config/default.json')

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
        var data = await repo.get()
        res.status(200).send(data)
    } catch (err) {
        res.status(500).send([{
            mensagem: config.Msg.statusCode500, erro: err
        }])
    }
}

exports.getByEstado = async (req, res, next) => {
    try {
        let estado = req.body.estado || req.params.estado || req.query.estado
        let data = await repo.getByEstado(estado)
        res.status(200).send(data)
    } catch (err) {
        res.status(500).send([{
            mensagem: config.Msg.statusCode500, erro: err
        }])
    }
}
exports.post = async (req, res, next) => {
    let nome = req.body.nome || req.params.nome || req.query.nome
    let estado = req.body.estado || req.params.estado || req.query.estado

    let dados = {
        nome: nome,
        estado: estado        
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

exports.patch = async (req, res) => {
    let id = req.body.id || req.params.id || req.query.id
    let body = req.body
    if (id && body) {
        try {
            await repo.updatePatch(id, body)
            res.status(200).send([{ mensagem: config.Msg.statusCode200 }])
        } catch (err) {
            res.status(500).send([{
                mensagem: config.Msg.statusCode500, erro: err
            }])
        }
    } else {
        res.status(204).send([{
            mensagem: config.Msg.id_BodyNaoEncontrado
        }])
    }
}

exports.delete = async (req, res) => {
    let id = req.body.id || req.params.id || req.query.id;
    if (id) {
        try {
            /*
            Nenhum documento pode ser excluído, apenas alterado o status para Inativo           
            */
            await repo.updatePatch(id, { status: 'Inativo' })
            res.status(200).send([{ mensagem: config.Msg.statusCode200 }])
        } catch (err) {
            res.status(500).send([{
                mensagem: config.Msg.statusCode500, erro: err
            }])
        }
    } else {
        res.status(204).send([{
            mensagem: config.Msg.idNaoencontrado
        }])
    }
}
