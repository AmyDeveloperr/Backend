const User = require('../models/User');

exports.addUser = async(req, res, next)=> {
    try {
      if(!req.body.email) {
        throw new Error('Email is mandatory');
      }
      if(!req.body.name) {
        throw new Error('Name is mandatory');
      }
      const name = req.body.name;
      const email = req.body.email;
      const data = await User.create({name: name, email: email});
      res.status(201).json({newUserDetail: data});
  } catch(err) {
      res.status(500).json({error: err});
  }
};

exports.getUser = async(req, res, next) => {
    try{
    const users = await User.findAll();
    res.status(200).json({allUsers: users});
    }catch(err) {
      console.log('Get user is failing',JSON.stringify(err));
      res.status(500).json({error: err})
    };
  }
  
  exports.deleteUser = async(req, res, next) => {
    try{
    const uId = req.params.id;
    await User.destroy({where:{id: uId}});
    res.sendStatus(200);
    }catch(err) {
      console.log('deleting user',JSON.stringify(err));
      res.status(500).json({error: err});
    }
  }