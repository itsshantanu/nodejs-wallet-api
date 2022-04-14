const express = require('express');

const userController = require('../controllers/user');
const isAuth = require('../middleware/is-auth');

const router = express.Router();

router.put('/sendMoney/:userId', isAuth, userController.sendMoney);

router.get('/transaction/:userId', isAuth, userController.getTransaction);

module.exports = router; 