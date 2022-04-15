const admin = require('../models/user');
const Transaction = require('../models/transaction');

exports.getTransaction = (req, res, next) => {
    Transaction.find()
        .then(transactions => {
        res.status(200).json({
            AllTransactions: [{
                transactions
            }]
        })
    })
    
};