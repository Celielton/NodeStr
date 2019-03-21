const express = require('express');
var routes = express.Router();
var controller = require('../controllers/order-controller');

routes.post('', controller.post);
routes.get('', controller.get);

exports.module = routes;