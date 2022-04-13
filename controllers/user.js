const User = require('../models/user'); 


exports.getUser = (req, res, next) => {
    const userId = req.params.userId;
    User.findById(userId)
      .then(user => {
        if (!user) {
          const error = new Error('Could not find user.');
          error.statusCode = 404;
          throw error;
        }
        res.status(200).json({ message: 'User fetched.', user: user });
      })
      .catch(err => {
        if (!err.statusCode) {
          err.statusCode = 500;
        }
        next(err);
      });
}; 


exports.getTransaction = (req, res, next) => {
    res.status(200).json({
      transactionDetail: [{
         trx_id:"12345234",
         from: "shantanu",
         to: "rishabh",
         amount: "50",
         date: "30/03/2022" 
      }]
    })
};