exports.getUserDetail = (req, res, next) => {
    res.status(200).json({
        userDetail: [{ name: 'Shantanu', userId: '3268'}]
    });
};

exports.createUser = (req, res, next) => {
    const name = req.body.name;
    const address = req.body.address;
    // Create post in db
    res.status(201).json({
      message: 'User created successfully!',
      user: { id: new Date().toISOString(), name: name, address: address }
    });
  }; 