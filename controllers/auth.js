const User = require('../models/user'); 

exports.postSignup = (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;
    const name = req.body.name;
    const address = req.body.address;
    const balance = '100';

    const user = new User({
        email: email, 
        password: password,
        name: name, 
        address: address, 
        balance: 100
    });
    user.save()
      .then(result => {
         console.log(result);
         res.status(201).json({
             message: 'User created successfully!',
             user: result
         });
       })
       .catch(err => {
        console.log(err);
        res.status(400).json({
            message: 'User not created!',
            user: err
        });
      })
};