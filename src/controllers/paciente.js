
const repo = require('../repositories/paciente')
const moment = require('moment')
const config = require('../../config/default.json')


let cachePacientes = {}


exports.getAll = async (req, res, next) => {
    try {
        if (cachePacientes.length !== undefined) {
            res.status(200).send(cachePacientes);
        } else {
            var data = await repo.getAll()
            cachePacientes = data
            res.status(200).send(data)
            setTimeout(() => {
                cachePacientes = {};
            }, 3000);
        }
    } catch (err) {
        res.status(500).send([{
            mensagem: config.Msg.statusCode500, erro: err
        }])
    }
}


exports.get = async (req, res, next) => {
    try {
        if (cachePacientes.length !== undefined) {
            res.status(204).send(cachePacientes)
        } else {
            var data = await repo.get()
            cachePacientes = data
            res.status(200).send(data)
            setTimeout(() => {
                cachePacientes = {}
            }, 3000)
        }
    } catch (err) {
        res.status(500).send([{
            mensagem: config.Msg.statusCode500, erro: err
        }])
    }
}


exports.getByNome = async (req, res, next) => {
    let nome = req.body.nome || req.params.nome || req.query.nome
    if (nome) {
        try {
            var data = await repo.getByNome(nome)
            if (data.length !== 0)
                res.status(200).send(data)
            else
                res.status(200).send([{ mensagem: config.Msg.nomeNaoEncontrado }])
        } catch (e) {
            res.status(500).send([{
                mensagem: config.Msg.statusCode500
            }]);
        }
    } else {
        res.status(204).send([{ mensagem: config.Msg.nomeNaoEncontrado }])
    }
}

exports.post = async (req, res, next) => {
    let nome = req.body.nome || req.params.nome || req.query.nome;
    let genero = req.body.genero || req.params.genero || req.query.genero;
    let data_nascimento = moment(req.body.data_nascimento || req.params.data_nascimento || req.query.data_nascimento, 'DD-MM-YYYY').format();
    let especial = req.body.especial || req.params.especial || req.query.especial;
    let observacao = req.body.observacao || req.params.observacao || req.query.observacao;

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

exports.patch = async (req, res, next) => {
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

exports.delete = async (req, res, next) => {
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
