'use strict';

var repository = require('../repositories/order-repository');
var guid = require('guid');
var authorizeService = require('../services/auth-service');

exports.get = async(req, res, next) => {
    res.status(200).send(await repository.get());
}

exports.post = async(req, res, next) => {
    try {
        const customer = await authorizeService.decode(req.headers['x-access-token']);
        let data = req.body;
        data.customer = customer.id; 
        data.number = guid.raw().substring(0,6);
        console.log(data.number)
        let o = await repository.create(data);
        res.status(201).send({message: 'Pedido criado com sucesso!', id: o._id});
    } catch(ex) {
        res.status(500).send({message: 'Ocorreu um erro ao criar pedido!', ex: ex});
    }
   
}

