'use strict';
var repository = require('../repositories/customer-repository');
const ValidationContract = require('../validators/fluent-validators');


exports.post = async(req, res, next) => {
    try {
        var validationContract = new ValidationContract();
        validationContract.hasMinLength(req.body.name, 3, "O nome deve ter no mínimo 3 caracteres!");
        validationContract.isEmail(req.body.email, "O cliente precisa ter um email válido!");
        validationContract.hasMinLength(req.body.password, 3, "O password deve ter no mínimo 3 caracteres!");
        if(!validationContract.isValid()){
            return res.status(400).send(validationContract.errors())
        }
        let customer = await repository.post(req.body);
        res.status(500).send({message: 'Cliente salvo com sucesso!', id: customer._id })

    } catch (e) {
        res.status(500).send({message: 'Ocorreu um erro ao tentar criar o cliente!', ex: e})
    }
}
