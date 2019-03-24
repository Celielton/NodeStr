'use strict';
const repository = require('../repositories/customer-repository');
const ValidationContract = require('../validators/fluent-validators');
const md5 = require('md5');
const emailService = require('../services/email-service');
const authService = require('../services/auth-service');

exports.get = async(req, res, next) => {
    res.status(200).send(await repository.get());
}

exports.post = async(req, res, next) => {
    try {
        var validationContract = new ValidationContract();
        validationContract.hasMinLength(req.body.name, 3, "O nome deve ter no mínimo 3 caracteres!");
        validationContract.isEmail(req.body.email, "O cliente precisa ter um email válido!");
        validationContract.hasMinLength(req.body.password, 3, "O password deve ter no mínimo 3 caracteres!");
        if(!validationContract.isValid()){
            return res.status(400).send(validationContract.errors())
        }
        let customer = await repository.create({
            name: req.body.name,
            email: req.body.email,
            password: md5(req.body.password + global.SALT_KEY)
        });

        emailService.send(req.body.email, "Bem-vindo à Node Store", global.EMAIL_TEMPLATE.replace('{0}', req.body.name))


        res.status(200).send({message: 'Cliente salvo com sucesso!', id: customer._id })

    } catch (e) {
        res.status(500).send({message: 'Ocorreu um erro ao tentar criar o cliente!', ex: e})
    }
}


exports.authorize = async(req, res, next) => {
    try {
        var customer = await repository
        .authenticate(req.body.email, md5(req.body.password + global.SALT_KEY));

        if(!customer){
             res.status(404).send({message: 'Usuário ou senha inválidos'});
             return;
        };
        const token =  await authService.generate({id: customer._id, email: customer.email, name: customer.name});
        const data = {
                token: token, 
                costumer: {
                    email: customer.email,
                    name: customer.name
                }
            };

        res.status(200).send(data);
    } catch(e) {
        res.status(500).send({message: 'Ocorreu um erro ao autenticar usuário', ex: e})
    }
 
}

exports.refreshToken = async(req, res, next) => {
    try {
        const data = await authService.decode(req.headers['x-access-token']);
        const customer = await repository
        .getById(data.id);

        if(!customer){
             res.status(404).send({message: 'Usuário não encontrado'});
             return;
        };
        const token =  await authService.generate({id: customer._id, email: customer.email, name: customer.name});
        res.status(200).send({token: token});
    } catch(e) {
        res.status(500).send({message: 'Ocorreu um erro fazer o refresh do token', ex: e})
    }
 
}