exports.getUserDetail = (req, res, next) => {
    res.status(200).json({
        userDetail: [{ name: 'Shantanu', userId: '3268'}]
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