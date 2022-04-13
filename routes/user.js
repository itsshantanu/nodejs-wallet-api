const express = require('express');

const userController = require('../controllers/user');

const router = express.Router();

router.post('/sendMoney', userController.sendMoney)

module.exports = router; 