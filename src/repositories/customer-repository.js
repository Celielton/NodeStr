'use strict';

const mongoose = require('mongoose');
const Customer = mongoose.model('Customer');

exports.get = async () => {
    return await Customer.find({});
}

exports.create = async (data) => {
    let customer = new Customer(data);
    await customer.save();
    return customer;
}

exports.authenticate = async(email, password) => {
    return Customer.findOne({ email: email, password: password});
}

exports.getById = async(id) => {
    return Customer.findById(id);
}