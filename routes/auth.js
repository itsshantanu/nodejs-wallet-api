const express = require('express');
const { body } = require('express-validator');

const User = require('../models/user');
const authController = require('../controllers/auth');

const router = express.Router();

router.put('/signup', [
    body('email')
        .isEmail()
        .withMessage('Please enter a valid email.')
        .custom((value, { req }) => {
            return User.findOne({ email: value }).then(userDoc => {
                if (userDoc) {
                    return Promise.reject('E-Mail address already exists!');
                }
            });
        })
        .normalizeEmail(),
    body('password')
        .trim()
        .isLength({ min: 5 }),
    body('userName')
        .trim()
        .not()
        .isEmpty()
        .custom((value, { req }) => {
            return User.findOne({ userName: value }).then(userDoc => {
                if (userDoc) {
                    return Promise.reject('User name already exists!');
                }
            });
        }),
], authController.signup);

router.post('/login', authController.login);

router.post('/admin/login', authController.adminLogin);

module.exports = router; 