'use strict';

const express = require('express');
const router = express.Router();
const controller = require('../controllers/product-controller');
const authService = require('../services/auth-service');


router.post('/', authService.authorize, controller.post);
router.put('/:id', controller.put);
router.delete('/:id', controller.delete);
router.get('', controller.get);
router.get('/:slug', controller.getBySlug);
router.get('/tags/:tag', controller.getByTag);
router.get('/product/:id', controller.getById);

module.exports = router;



//https://mlab.com/