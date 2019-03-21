var repository = require('../repositories/order-repository');
var guid = require('guid');

exports.get = async(req, res, next) => {
    res.status(200).send(await repository.get());
}

exports.post = async(req, res, next) => {
    try {
        let data = req.body;
        data.number = guid.raw().substring(0,6);
        let order = await repository.create();
        res.status(201).send({message: 'Pedido criado com sucesso!', id: order._id});
    } catch(ex) {
        res.status(201).send({message: 'Ocorreu um erro ao criar pedido!', ex: ex});
    }
   
}

