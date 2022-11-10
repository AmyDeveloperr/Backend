
const User = require('../models/user')

const bcrypt = require('bcrypt');

exports.addUserDetails = async (req, res, next) => {
    
    try {

        const {email, username, password} = req.body;

    if(!email || !username || !password) {
        res.status(400).json({message: 'enter all fields'});
    }

    const dbData =  await User.findAll({where:{email}});

    //console.log('this is db data', dbData[0].email);
    if(dbData.length > 0) {
        
        return res.status(207).json({message:'user already exists'});     
    }
    else {
        bcrypt.hash(password, 10, async(err, hash) => {
            console.log(err);
            await User.create({email, username, password: hash});
        res.status(201).json({message: 'user successfully created'});
        })
        
    }
      
}catch(err) {
    res.status(500).json({error: err});  
  }

};

exports.addLoginDetails = async (req, res, next) => {

try {
        const password = req.body.pass;
        const email = req.body.email;

        if (!email || !password) {
            res.status(401).json({message: 'enter all the fields'});
        }
       
        const dbData = await User.findAll({where:{email}});
        if(dbData.length > 0) {

                bcrypt.compare(password, dbData[0].password, (err, result) => {
                    if (err) {
                        res.status(500).json({message:'something went wrong'});
                    }
                    if(result === true) {
                        res.status(201).json({message:'user login successful'});
                    }
                
                else {
                    return res.status(207).json({message:'Password is wrong'});
                }
                })
                    
        } else {
            return res.status(208).json({message:'user does not exist'});
        }

}catch(err) {
    res.status(500).json({error: err});
}

};