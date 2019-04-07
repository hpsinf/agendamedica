
const auth = require('../../services/auth')
const config = require('../../config/default.json')


function dataAtualFormatada(){
    var data = new Date(),
        dia  = data.getDate().toString(),
        diaF = (dia.length == 1) ? '0'+dia : dia,
        mes  = (data.getMonth()+1).toString(), //+1 pois no getMonth Janeiro começa com zero.
        mesF = (mes.length == 1) ? '0'+mes : mes,
        anoF = data.getFullYear()
    return diaF+'/'+mesF+'/'+anoF
}

exports.getLicenca = async (req, res, next) => {
    const dias = req.body.dias || req.params.dias || req.query.dias
    const cliente = req.body.cliente || req.params.cliente || req.query.cliente
    
    dados = {
        dias: dias + 'd',
        cliente: cliente,
        datageracao: dataAtualFormatada()
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
