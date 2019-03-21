'use strict';
const ValidationContract = require('../validators/fluent-validators');
const repository = require('../repositories/porduct-repository');

exports.get = async (req, res, next) => {
    try {
        res.status(200).send(await repository.get());
    } catch (e) {
        res.send(500).send({message: "Falha ao listar produtos!", ex: e})
    }
};


exports.getBySlug = async (req, res, next) => {
    try {
        res.status(200).send(await repository.getBySlug(req.params.slug));
    } catch(e)  {
        res.send(500).send({message: "Falha ao listar produtos!", ex: e})
    }
};

exports.getByTag = async (req, res, next) => {
    try {
        res.status(200).send(await repository.getByTag(req.params.tag));
    } catch (e) {
        res.send(500).send({message: "Falha ao listar produtos!", ex: e})
    }
};

exports.getById = async (req, res, next) => {
    try {
        res.status(200).send(await repository.getById(req.params.id));
    } catch(e){
        res.send(500).send({message: `Falha ao recuperar produto!`, ex: e})
    }
};

exports.post = async (req, res, next) => {
    try {
        let contract = new ValidationContract();

        contract.hasMinLength(req.body.title, 3, "O título deve ter no mínimo 3 caracteres");
        contract.hasMinLength(req.body.slug, 3, "O slug deve ter no mínimo 3 caracteres");
        contract.hasMinLength(req.body.description, 3, "O descrção deve ter no mínimo 3 caracteres");


        if(!contract.isValid()){
            res.status(400).send(contract.errors());
            return;
        }

        let p = await repository.create(req.body);
        res.status(201).send({message: "Produto cadastrado com sucesso!", id: p._id});

    } catch(e) {
        res.status(500).send({message: "Falha ao cadastrar produto!", ex: e});
    }
};



exports.put = async (req, res, next) => {
    try {
        await repository.update(req.params.id, req.body);
        res.status(200).send({message: "Produto atualizado com sucesso!"});
    } catch(e) {
        res.status(500).send({message: "Falha ao atualizar o produto!", ex: e});
    }
};


exports.delete = async(req, res, next) => {
    try {
        await repository.delete(req.params.id);
        res.status(200).send({message: "Produto removido com sucesso!"});
    } catch(e) {
        res.status(500).send({message: "Falha ao remover o produto!", ex: e});
    }
};
