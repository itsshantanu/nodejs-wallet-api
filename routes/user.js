const express = require('express');

const userController = require('../controllers/user');

const router = express.Router();

router.get('/userDetail', userController.getUserDetail);

router.get('/transactions', userController.getTransaction)

module.exports = router; 