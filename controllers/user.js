
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
    
    const dbData =  await User.findAll({where:{email}});

    //console.log('this is db data', dbData[0].email);
    if(dbData.length > 0) {
        
        res.status(207).json({message:'user already exists'});     
    }
    else {
        await User.create({email: email, username: name, password: pass});
        res.status(201).json({message: 'user successfully created'});
    }
      
}catch(err) {
    res.status(500).json({error: err});  
  }

};

exports.addLoginDetails = async (req, res, next) => {

    try {

        if(!req.body.email) {
            throw new Error('Email is mandatory');
        }

        if(!req.body.pass) {
            throw new Error('password is mandatory');
        }

        const pass = req.body.pass;
        const email = req.body.email;
        
        const dbData = await User.findAll({where:{email}});
        if(dbData.length > 0) {

            if (dbData[0].password == pass) {
                res.status(201).json({message:'user login successful'});
            } 
            else {
                return res.status(207).json({message:'Password is wrong'});
            }
        } else {
            return res.status(208).json({message:'user does not exist'});
        }

}catch(err) {
    res.status(500).json({error: err});
}

};