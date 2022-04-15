const express = require('express');

const adminController = require('../controllers/admin');
const isAuth = require('../middleware/is-auth');

const router = express.Router();

router.get('/transaction', isAuth, adminController.getTransaction);

module.exports = router; 

