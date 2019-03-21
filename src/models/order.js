'use strict';
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    numero: {
        type: String,
        required: true,
    },
    createDate: {
        type: String,
        required: true,
        enum: ['created', 'done'],
        default: 'created'
    },
    status: {
        type: String,
        required: true,
    },
    customer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Customer'
    },
    items: [{
        quantity: {
            type: Number,
            required: true,
            default: 1
        },
        price: {
            type: Number,
            required: true,
        },
        product: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product'
        }
    }],

})


module.exports = mongoose.model("Order", schema);