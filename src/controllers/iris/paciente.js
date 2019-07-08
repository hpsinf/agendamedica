
const repo = require('../../repositories/iris/paciente')
const moment = require('moment')
const config = require('../../../config/default.json')


let cachePacientes = {}
let cachePacientesAll = {}
let cacheByNome = {}
let cacheNome = {}


exports.getAll = async (req, res) => {
    try {
        if (cachePacientesAll.length !== undefined) {
            res.status(200).send(cachePacientesAll)
        } else {
            cachePacientesAll = await repo.getAll()
            res.status(200).send(cachePacientesAll)
            setTimeout(() => {
                cachePacientesAll = {}
            }, 30000);
        }
    } catch (err) {
        res.status(500).send([{
            mensagem: config.Msg.statusCode500, erro: err
        }])
    }
}


exports.get = async (req, res) => {
    try {
        if (cachePacientes.length !== undefined) {
            res.status(200).send(cachePacientes)
        } else {
            cachePacientes = await repo.get()
            res.status(200).send(cachePacientes)
            setTimeout(() => {
                cachePacientes = {}
            }, 30000)
        }
    } catch (err) {
        res.status(500).send([{
            mensagem: config.Msg.statusCode500, erro: err
        }])
    }
}


exports.getByNome = async (req, res) => {
    let nome = req.body.nome || req.params.nome || req.query.nome
    if (nome !== cacheNome) {
        try {
            cacheByNome = await repo.getByNome(nome)
            cacheNome = nome;
            if (cacheByNome.length !== 0)
                res.status(200).send(cacheByNome)
            else
                res.status(200).send([{ mensagem: config.Msg.nomeNaoEncontrado }])

            setTimeout(() => {
                cacheByNome = {}
                cacheNome = {}
            }, 30000)
        } catch (err) {
            res.status(500).send([{
                mensagem: config.Msg.statusCode500, erro: err
            }]);
        }
    } else {
        res.status(200).send(cacheByNome)
    }
}

exports.post = async (req, res) => {
    let nome = req.body.nome || req.params.nome || req.query.nome
    let genero = req.body.genero || req.params.genero || req.query.genero
    let data_nascimento = moment(req.body.data_nascimento || req.params.data_nascimento || req.query.data_nascimento, 'DD-MM-YYYY').format()
    let especial = req.body.especial || req.params.especial || req.query.especial
    let observacao = req.body.observacao || req.params.observacao || req.query.observacao

    let dados = {
        nome: nome,
        genero: genero,
        data_nascimento: data_nascimento,
        especial: especial,
        observacao: observacao
    }

    try {
        await repo.create(dados)
        res.status(201).send([{ mensagem: config.Msg.statusCode200, paciente: dados }])
    } catch (err) {
        res.status(500).send([{
            mensagem: config.Msg.statusCode500, erro: err
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
    let id = req.body.id || req.params.id || req.query.id
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
