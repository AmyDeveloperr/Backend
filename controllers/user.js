
const User = require('../models/user')
exports.addUserDetails = async (req, res, next) => {
    try {
    if(!req.body.emailId) {
        throw new Error('Email Id is mandatory');
    }

    if(!req.body.userName) {
        throw new Error('Username is mandatory');
    }

    if(!req.body.pass) {
        throw new Error('password is mandatory');
    }

    const email = req.body.emailId;
    const name = req.body.userName;
    const pass = req.body.pass;

    const dbData = await User.findAll({where:{email:email}});

    console.log('this is db data', dbData);

    if (email === dbData) {
        res.status(500).json({message:'user already exists'});
    } else {
        await User.create({email: email, username: name, password: pass});
        res.status(201).json({message: 'user successfully created'});
    }

}catch(err) {
    res.status(500).json({error: err});
}

};