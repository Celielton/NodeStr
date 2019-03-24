'use strict';
const express = require('express');
const router = express.Router();
const controller = require('../controllers/customer-controller');
const authService = require('../services/auth-service');

router.post('', controller.post);
router.get('', authService.isAdmin, controller.get);
router.post('/login', controller.authorize);
router.post('/refreshToken', authService.authorize, controller.refreshToken);

module.exports = router;
