const express = require('express');

const userController = require('../controllers/user');

const router = express.Router();

router.get('/user/:userId', userController.getUser);

router.get('/transactions', userController.getTransaction)

module.exports = router; 