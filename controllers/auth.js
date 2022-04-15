const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/user');
const Admin = require('../models/admin');
const admin = require('../models/admin');


exports.signup = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const error = new Error('Validation failed.');
        error.statusCode = 422;
        error.data = errors.array();
        throw error;
    }
    const email = req.body.email;
    const userName = req.body.userName;
    const password = req.body.password;

    bcrypt
        .hash(password, 12)
        .then(hashedPw => {
            const user = new User({
                email: email,
                password: hashedPw,
                userName: userName,
                balance: 100
            });
            return user.save();
        })
        .then(result => {
            res.status(201).json({ message: 'User created!', userId: result._id });
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
};

exports.login = (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;
    let loadedUser;
    User.findOne({ email: email })
        .then(user => {
            if (!user) {
                const error = new Error('A user with this email could not be found.');
                error.statusCode = 401;
                throw error;
            }
            loadedUser = user;
            return bcrypt.compare(password, user.password);
        })
        .then(isEqual => {
            if (!isEqual) {
                const error = new Error('Wrong password!');
                error.statusCode = 401;
                throw error;
            }
            const token = jwt.sign(
                {
                    email: loadedUser.email,
                    userId: loadedUser._id.toString()
                },
                'walletsecret',
                { expiresIn: '1h' }
            );
            res.status(200).json({ token: token, userId: loadedUser._id.toString() });
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
};

exports.adminLogin = (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;
    
    Admin.findOne({email: email})
        .then(admin => {
            if (!admin) {
                const error = new Error('An admin with this email could not be found.');
                error.statusCode = 401;
                throw error;
            }
            return admin
        })
        .then(admin => {
            if (admin.password !== password) {
                const error = new Error('Wrong Password');
                error.statusCode = 401;
                throw error;
            }
            const token = jwt.sign(
                {
                    email: admin.email,
                    userId: admin._id.toString()
                },
                'walletsecret',
                { expiresIn: '1h' }
            );
            res.status(200).json({ token: token, userId: admin._id.toString() });
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
}