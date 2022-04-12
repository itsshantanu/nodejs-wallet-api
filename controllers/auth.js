
exports.postSignup = (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;
    const confirmPassword = req.body.confirmPassword;
    const name = req.body.name;
    const address = req.body.address;
    const balance = '100';

    res.status(201).json({
        message: 'User created successfully!',
        user: { 
            id: new Date().toISOString(), 
            email: email, 
            password: password, 
            confirmPassword: confirmPassword, 
            name: name, 
            address: address, 
            balance: balance 
        }
      });

};