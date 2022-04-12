const express = require('express');

const userController = require('../controllers/user');

const router = express.Router();

router.get('/userDetail', userController.getUserDetail);

router.post('/user', userController.createUser);

module.exports = router; 