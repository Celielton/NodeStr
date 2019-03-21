//https://www.youtube.com/playlist?list=PLHlHvK2lnJndvvycjBqQAbgEDqXxKLoqn
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');


const app = express();
// converte todos os objetos da request para json
app.use(bodyParser.json());
// cuida o encode dos caracteres
app.use(bodyParser.urlencoded({ extended: false }));

/**Define as rotas e cria uma rota com seus request handlers*/
const router = express.Router();

/**Conecta com o mongoDB */
// mongoose.connect("mongodb://sa:sa123$@localhost:27017/NodeStr", {useNewUrlParser: true});
mongoose.connect("mongodb://localhost:27017/NodeStr", {useNewUrlParser: true});

//Carrega os models
const Product = require('./models/producs');
const Customer = require('./models/customer');
const Order = require('./models/order');

const indexRoute = require('./routers/index-route');
const productRoute = require('./routers/product-route');
const customerRoute = require('./routers/customer-route');


app.use('/', indexRoute);
app.use('/products', productRoute);
app.use('/customer', customerRoute);


module.exports = app;