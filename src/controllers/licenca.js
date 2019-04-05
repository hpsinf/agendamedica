
const auth = require('../../services/auth')
const config = require('../../config/default.json')

exports.getLicenca = async (req, res, next) => {
    const dias = req.body.dias || req.params.dias || req.query.dias
    const cliente = req.body.cliente || req.params.cliente || req.query.cliente

    dados = {
        dias: dias + 'd',
        cliente: cliente
    }
    const token = await auth.generateToken(dados)
    if (!token)
        res.status(500).send([{ Erro: config.Msg.erroAoGerarVerificarChave }])

    res.status(200).send([{ chave: token }])
}

exports.getVerificar = async (req, res, next) => {
    const chave = req.body.chave || req.params.chave || req.query.chave

    const token = await auth.verifiyToken(chave)

    if (!token)
        res.status(500).send([{ Erro: config.Msg.erroAoGerarVerificarChave }])

    res.status(200).send([{ dados: token }])
}
