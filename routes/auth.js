const express = require('express');
const { body } = require('express-validator');

const User = require('../models/user');
const authController = require('../controllers/auth');

const router = express.Router();

// router.get('/login', authController.getLogin);

// router.post('/login', authController.postLogin);

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
    body('name')
        .trim()
        .not()
        .isEmpty(),
    body('contact')
        .trim()
        .isNumeric()
        .isLength({min: 10, max: 10})
        .withMessage('Please enter a valid 10 digit number')
        .custom((value, { req }) => {
            return User.findOne({ contact: value }).then(userDoc => {
                if (userDoc) {
                    return Promise.reject('Contact already exists!');
                }
            });
        })
], authController.signup);

router.post('/login', authController.login);

module.exports = router; 