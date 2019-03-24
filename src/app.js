//https://www.youtube.com/playlist?list=PLHlHvK2lnJndvvycjBqQAbgEDqXxKLoqn
'use strict';
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const config = require('./config');




/**Define as rotas e cria uma rota com seus request handlers*/
const router = express.Router();

/**Conecta com o mongoDB */

mongoose.connect(config.connectionString, {useNewUrlParser: true});

//Carrega os models
const Product = require('./models/producs');
const Customer = require('./models/customer');
const Order = require('./models/order');

const indexRoute = require('./routers/index-route');
const productRoute = require('./routers/product-route');
const customerRoute = require('./routers/customer-route');
const orderRoute = require('./routers/order-route');


const app = express();
// converte todos os objetos da request para json
app.use(bodyParser.json({ limit: '5mb' }));
// cuida o encode dos caracteres
app.use(bodyParser.urlencoded({ extended: false }));

app.use(function(req, res, next){
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, x-access-token");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH, OPTIONS');
})

app.use('/', indexRoute);
app.use('/products', productRoute);
app.use('/customer', customerRoute);
app.use('/order', orderRoute);


module.exports = app;