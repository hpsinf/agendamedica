'use strict'


const repo = require('../repositories/paciente');
const moment = require('moment');


exports.getAll = async (req, res, next) => {
    try {
        var data = await repo.getAll();
        res.status(200).send(data);
    } catch (e) {
        res.status(500).send({
            messege: 'Falha ao processar requisição!'
        });
    }
}

exports.get = async (req, res, next) => {
    try {
        var data = await repo.getAll();
        res.status(200).send(data);
    } catch (e) {
        res.status(500).send({
            messege: 'Falha ao processar requisição!'
        });
    }
}

exports.post = async (req, res, next) => {
    let nome = req.body.nome || req.params.nome;
    let genero = req.body.genero || req.params.genero;
    let data_nascimento = moment(req.body.data_nascimento || req.params.data_nascimento, 'DD-MM-YYYY').format();;
    //if (req.body.especial || req.params.especial)
    let especial = req.body.especial || req.params.especial;
    let observacao = req.body.observacao || req.params.observacao;    

    let dados = {
        nome: nome,
        genero: genero,
        data_nascimento: data_nascimento,
        especial: especial,
        observacao: observacao
    }

    try {
        await repo.create(dados);
        res.status(201).send({ messege: 'Cadastrado efetuado!', paciente: dados });
    } catch (err) {
        res.status(500).send({
            messege: 'Falha ao cadastrar Paciente!', data: err
        });
    }
}

exports.getAuth = async (req, res, next) => {
    
    var email = req.body.email || req.params.email || req.query.email;
    var password = req.body.password || req.params.password || req.query.password;

     try {
        var data = await repo.getAuth({
            email: email,
            password: md5(email + password + key )
        });
        
        if (!data) {
            res.status(401).send({message: 'Não autorizado'});    
            return;
        }

        const token = await auth.generateToken({email: data.email});
        res.status(200).send({token: token, user: data});
        
    } catch (err) {
        res.status(500).send({
            messege: 'Falha ao processar requisição!', erro: err
        });
    }
}
