const User = require('../models/user');
const Transaction = require('../models/transaction');

const { validationResult } = require('express-validator');


exports.sendMoney = (req, res, next) => {
    const userId = req.params.userId;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const error = new Error('Validation failed, entered data is incorrect.');
        error.statusCode = 422;
        throw error;
    }

    const sendTo = req.body.sendTo;
    const amount = req.body.amount;

    User.findOne({userName: new RegExp('^'+sendTo+'$', "i")})
        .then(userName => {
            if (!userName) {
                const error = new Error('Could not find userName.');
                error.statusCode = 404;
                throw error;
            }
            User.findById(userId)
                .then(user => {
                    if (!user || sendTo == user.userName) {
                        const error = new Error('Enter a valid user.');
                        error.statusCode = 404;
                        throw error;
                    } 
                    if (amount <= user.balance && user.balance > 0) {
                        const updatedBalance = user.balance - amount;
                        user.balance = updatedBalance;
                        return user.save();
                    } else {
                        return Promise.reject('No sufficent balance in account');
                    }

                })
                .then(result => {
                    const userUpdatedBalance = userName.balance + amount;
                    userName.balance = userUpdatedBalance;
                    return userName.save();  
                })
                .then(result => {
                    const transaction = new Transaction({
                        sendToContact: sendTo,
                        amount: amount,
                        userId: userId
                    });
                    return transaction.save();
                })
                .then(transaction => {
                    res.status(200).json({ message: 'Transaction complete!', transaction: transaction });
                })
                .catch(err => {
                    if (!err.statusCode) {
                        err.statusCode = 500;
                    }
                    next(err);
                });
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });     
}


exports.getTransaction = (req, res, next) => {
    const userId = req.params.userId;
    Transaction.find({'userId': userId})
        .then(transactions => {
        res.status(200).json({
            userTransactions: [{
                transactions
            }]
        })
    })
    
};